<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::latest()->limit(50)->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:100',
            'message' => 'required|string|max:500',
            'send_to_whatsapp' => 'nullable|boolean'
        ]);

        Message::create([
            'name' => $validated['name'] ?? 'Anonim',
            'message' => $validated['message'],
            'send_to_whatsapp' => $validated['send_to_whatsapp'] ?? false
        ]);

        return response()->json([
            'message' => 'Pesan berhasil dikirim'
        ], 201);
    }
}
