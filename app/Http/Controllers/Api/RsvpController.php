<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rsvp;
use Illuminate\Http\Request;

class RsvpController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:100',
            'status' => 'required|in:hadir,tidak_hadir',
            'guest_count' => 'nullable|integer|min:1|max:10'
        ]);

        Rsvp::create([
            'name' => $validated['name'] ?? null,
            'status' => $validated['status'],
            'guest_count' => $validated['guest_count'] ?? 1
        ]);

        return response()->json([
            'message' => 'RSVP berhasil dikirim'
        ], 201);
    }
}
