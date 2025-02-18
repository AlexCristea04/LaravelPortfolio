<?php

namespace App\Http\Controllers;

use App\Models\Projects\Project;
use App\Models\Projects\ProjectTranslation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Project::with('translations')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'url' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'translations' => 'required|string', // Accept translations as a JSON string
        ]);

        // Decode JSON string into an array
        $translations = json_decode($request->translations, true);

        if (!is_array($translations)) {
            return response()->json(['error' => 'Invalid JSON format in translations'], 400);
        }

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects', 'public');
        }

        $project = Project::create([
            'url' => $request->url,
            'image_path' => $imagePath,
        ]);

        foreach ($translations as $translation) {
            ProjectTranslation::create([
                'project_id' => $project->id,
                'language' => $translation['language'],
                'title' => $translation['title'],
                'description' => $translation['description'],
                'role' => $translation['role'],
            ]);
        }

        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project->load('translations')->makeHidden('image_path')->append('image_url')
        ]);
    }


    public function show(Project $project): JsonResponse
    {
        return response()->json($project->load('translations'));
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $request->validate([
            'image_id' => 'sometimes|string',
            'url' => 'sometimes|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'translations' => 'sometimes|array|min:2',
            'translations.*.language' => 'required|in:en,fr',
            'translations.*.title' => 'required|string',
            'translations.*.description' => 'required|string',
            'translations.*.role' => 'required|string',
        ]);

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }

            // Store new image
            $project->image_path = $request->file('image')->store('projects', 'public');
        }

        $project->update($request->only('image_id', 'url', 'image_path'));

        if ($request->has('translations')) {
            foreach ($request->translations as $translation) {
                ProjectTranslation::updateOrCreate(
                    ['project_id' => $project->id, 'language' => $translation['language']],
                    $translation
                );
            }
        }

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project->load('translations')->makeHidden('image_path')->append('image_url')
        ]);
    }


    public function destroy(Project $project): JsonResponse
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}

