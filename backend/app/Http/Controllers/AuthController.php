<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:admins',
            'password' => 'required|string|min:8',
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Admin registered successfully']);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function logout(Request $request): JsonResponse
    {
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized. No valid token found.'], 401);
        }

        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function verifyToken(Request $request): JsonResponse
    {
        if (!$request->user()) {
            return response()->json([
                'authenticated' => false,
                'message' => 'Invalid or expired token.'
            ], 401);
        }

        return response()->json([
            'authenticated' => true,
            'admin' => $request->user(),
        ]);
    }

}
