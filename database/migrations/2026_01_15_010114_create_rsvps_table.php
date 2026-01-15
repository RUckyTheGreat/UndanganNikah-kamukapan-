<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('rsvps', function (Blueprint $table) {
        $table->id();
        $table->string('name')->nullable();
        $table->enum('status', ['hadir', 'tidak_hadir']);
        $table->unsignedTinyInteger('guest_count')->default(1);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvps');
    }
};
