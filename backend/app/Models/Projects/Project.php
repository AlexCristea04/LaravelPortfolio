<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['image_id', 'url', 'image_path'];

    public static function boot(): void
    {
        parent::boot();
        static::creating(function ($project) {
            $project->image_id = Str::uuid(); // Generate UUID automatically
        });
    }

    public function translations(): HasMany
    {
        return $this->hasMany(ProjectTranslation::class);
    }

    public function translation($lang = 'en'): HasOne
    {
        return $this->hasOne(ProjectTranslation::class)->where('language', $lang);
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    protected $appends = ['image_url'];
}
