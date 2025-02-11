<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectTranslation extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'language', 'title', 'description', 'role'];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
