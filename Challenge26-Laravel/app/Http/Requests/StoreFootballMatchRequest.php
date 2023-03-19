<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFootballMatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'match_day' => ['required', 'date'],
            'team_1_id' => ['required', 'integer', 'min:1'],
            'team_2_id' => ['required', 'integer', 'min:1'],
        ];


    }

    public function messages()
    {
        return [
            'team_1_id.min:1' => 'Please select team',
            'team_2_id.min:1' => 'Please select team',
        ];
    }
}
