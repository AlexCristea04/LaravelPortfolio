<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = ['authorname', 'companyname', 'review', 'approval'];

    protected $casts = [
        'approval' => 'boolean', // Ensure approval is always treated as a boolean
    ];
}
