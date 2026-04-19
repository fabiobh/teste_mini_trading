<?php

namespace App\Http\Controllers;
use App\Models\Transaction;
use App\Http\Requests\BuyRequest;
use App\Http\Requests\SellRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TradeController extends Controller
{
    /**
     * Retornar saldos do usuário
     */
    public function wallet(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'balance_brl' => (float) $user->balance_brl,
            'balance_btc' => (float) $user->balance_btc,
        ]);
    }

    /**
     * Retornar preço dinâmico do BTC (Fake)
     */
    public function market(Request $request)
    {
        $price = $this->getCurrentPrice();

        return response()->json([
            'symbol' => 'BTC/BRL',
            'price' => $price,
            'timestamp' => now()->toIso8601String()
        ]);
    }

    /**
     * Compra de BTC
     */
    public function buy(BuyRequest $request)
    {
        $user = $request->user();
        $price = $this->getCurrentPrice();
        $amountBrl = $request->amount_brl;
        $amountBtc = $amountBrl / $price;

        if ($user->balance_brl < $amountBrl) {
            return response()->json(['message' => 'Saldo insuficiente em Reais.'], 400);
        }

        return DB::transaction(function () use ($user, $amountBtc, $amountBrl, $price) {
            // Atualiza saldos
            $user->balance_brl -= $amountBrl;
            $user->balance_btc += $amountBtc;
            $user->save();

            // Histórico
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'type' => 'buy',
                'amount_btc' => $amountBtc,
                'price_at_moment' => $price,
                'total_brl' => $amountBrl,
            ]);

            return response()->json([
                'message' => 'Compra realizada com sucesso!',
                'transaction' => $transaction,
                'wallet' => [
                    'balance_brl' => (float) $user->balance_brl,
                    'balance_btc' => (float) $user->balance_btc,
                ]
            ]);
        });
    }

    /**
     * Venda de BTC
     */
    public function sell(SellRequest $request)
    {
        $user = $request->user();
        $price = $this->getCurrentPrice();
        $amountBtc = $request->amount_btc;
        $amountBrl = $amountBtc * $price;

        if ($user->balance_btc < $amountBtc) {
            return response()->json(['message' => 'Saldo insuficiente em BTC.'], 400);
        }

        return DB::transaction(function () use ($user, $amountBtc, $amountBrl, $price) {
            // Atualiza saldos
            $user->balance_btc -= $amountBtc;
            $user->balance_brl += $amountBrl;
            $user->save();

            // Histórico
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'type' => 'sell',
                'amount_btc' => $amountBtc,
                'price_at_moment' => $price,
                'total_brl' => $amountBrl,
            ]);

            return response()->json([
                'message' => 'Venda realizada com sucesso!',
                'transaction' => $transaction,
                'wallet' => [
                    'balance_brl' => (float) $user->balance_brl,
                    'balance_btc' => (float) $user->balance_btc,
                ]
            ]);
        });
    }

    /**
     * Histórico de Transações
     */
    public function transactions(Request $request)
    {
        $transactions = $request->user()->transactions()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($transactions);
    }

    private function getCurrentPrice()
    {
        return rand(200000, 300000);
    }
}
