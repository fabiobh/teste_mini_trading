<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'amount_btc',
        'price_at_moment',
        'total_brl',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
