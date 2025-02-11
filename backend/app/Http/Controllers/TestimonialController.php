<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Testimonial::all());
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'authorname' => 'required|string|max:255',
            'companyname' => 'required|string|max:255',
            'review' => 'required|string|max:100',
            'approval' => 'boolean',
        ]);

        $testimonial = Testimonial::create($request->all());

        return response()->json(['message' => 'Testimonial created successfully', 'testimonial' => $testimonial]);
    }

    public function show(Testimonial $testimonial): JsonResponse
    {
        return response()->json($testimonial);
    }

    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $request->validate([
            'authorname' => 'sometimes|string|max:255',
            'companyname' => 'sometimes|string|max:255',
            'review' => 'sometimes|string|max:100',
            'approval' => 'boolean',
        ]);

        $testimonial->update($request->all());

        return response()->json(['message' => 'Testimonial updated successfully', 'testimonial' => $testimonial]);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();
        return response()->json(['message' => 'Testimonial deleted successfully']);
    }

    public function approve(Testimonial $testimonial): JsonResponse
    {
        $testimonial->update(['approval' => true]);

        return response()->json(['message' => 'Testimonial approved successfully', 'testimonial' => $testimonial]);
    }

    public function unapprove(Testimonial $testimonial): JsonResponse
    {
        $testimonial->update(['approval' => false]);

        return response()->json(['message' => 'Testimonial unapproved successfully', 'testimonial' => $testimonial]);
    }

}
