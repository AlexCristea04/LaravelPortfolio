<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['image_id', 'url'];

    public function translations()
    {
        return $this->hasMany(ProjectTranslation::class);
    }

    public function translation($lang = 'en')
    {
        return $this->hasOne(ProjectTranslation::class)->where('language', $lang);
    }
}
