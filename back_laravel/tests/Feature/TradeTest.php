<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TradeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // O banco de dados já inicializa com R$ 10.000,00 no registro se usarmos a lógica de default na migration
        // Mas para os testes, vamos garantir o saldo.
    }

    public function test_user_can_buy_btc(): void
    {
        $user = User::factory()->create(['balance_brl' => 10000, 'balance_btc' => 0]);
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
                         ->postJson('/api/trade/buy', [
                             'amount_brl' => 5000,
                         ]);

        $response->assertStatus(200)
                 ->assertJsonPath('transaction.type', 'buy')
                 ->assertJsonStructure(['transaction', 'wallet']);

        $user->refresh();
        $this->assertEquals(5000, $user->balance_brl);
        $this->assertGreaterThan(0, $user->balance_btc);
    }

    public function test_user_cannot_buy_btc_without_funds(): void
    {
        $user = User::factory()->create(['balance_brl' => 100, 'balance_btc' => 0]);
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
                         ->postJson('/api/trade/buy', [
                             'amount_brl' => 5000,
                         ]);

        $response->assertStatus(400)
                 ->assertJson(['message' => 'Saldo insuficiente em Reais.']);
    }

    public function test_user_can_view_transaction_history(): void
    {
        $user = User::factory()->create(['balance_brl' => 10000]);
        $token = $user->createToken('test')->plainTextToken;

        // Faz uma compra
        $this->withHeader('Authorization', "Bearer $token")
             ->postJson('/api/trade/buy', ['amount_brl' => 1000]);

        $response = $this->withHeader('Authorization', "Bearer $token")
                         ->getJson('/api/transactions');

        $response->assertStatus(200)
                 ->assertJsonCount(1);
    }
}
