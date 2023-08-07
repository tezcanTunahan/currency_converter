"use client";
import { NativeSelect, TextInput, Button, rem } from "@mantine/core";
import { useEffect, useState } from "react";

async function getData(amount: number, currency: string, convertTo: string) {
  const res = await fetch(
    `https://api.exchangerate.host/convert?from=${currency}&to=${convertTo}&amount=${amount}}`
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

export default function Converter() {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("eur");
  const [convertTo, setConvertTo] = useState<string>("eur");
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    getData(amount, currency, convertTo)
      .then((data) => {
        setResult(data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [amount, currency, convertTo]);

  const data = [
    { value: "eur", label: "🇪🇺 EUR" },
    { value: "usd", label: "🇺🇸 USD" },
    { value: "cad", label: "🇨🇦 CAD" },
    { value: "gbp", label: "🇬🇧 GBP" },
    { value: "aud", label: "🇦🇺 AUD" },
    { value: "jpy", label: "🇯🇵 JPY" },
    { value: "cny", label: "🇨🇳 CNY" },
    { value: "rub", label: "🇷🇺 RUB" },
    { value: "inr", label: "🇮🇳 INR" },
    { value: "brl", label: "🇧🇷 BRL" },
    { value: "chf", label: "🇨🇭 CHF" },
    { value: "mxn", label: "🇲🇽 MXN" },
    { value: "idr", label: "🇮🇩 IDR" },
    { value: "try", label: "🇹🇷 TRY" },
    { value: "zar", label: "🇿🇦 ZAR" },
    { value: "hkd", label: "🇭🇰 HKD" },
    { value: "myr", label: "🇲🇾 MYR" },
    { value: "nzd", label: "🇳🇿 NZD" },
    { value: "php", label: "🇵🇭 PHP" },
    { value: "sgd", label: "🇸🇬 SGD" },
    { value: "thb", label: "🇹🇭 THB" },
    { value: "czk", label: "🇨🇿 CZK" },
    { value: "pln", label: "🇵🇱 PLN" },
    { value: "huf", label: "🇭🇺 HUF" },
    { value: "sek", label: "🇸🇪 SEK" },
    { value: "dkk", label: "🇩🇰 DKK" },
    { value: "isk", label: "🇮🇸 ISK" },
    { value: "nok", label: "🇳🇴 NOK" },
    { value: "hrk", label: "🇭🇷 HRK" },
    { value: "ron", label: "🇷🇴 RON" },
    { value: "bgn", label: "🇧🇬 BGN" },
    { value: "ils", label: "🇮🇱 ILS" },
    { value: "krw", label: "🇰🇷 KRW" },
  ];

  return (
    <div className="converter-container">
      <div className="converter">
        <TextInput
          onChange={(e) => {
            setAmount(Number(e.currentTarget.value));
          }}
          type="number"
          placeholder="Enter amount"
          label="amount"
          style={{ width: "100%" }}
        />

        <NativeSelect
          data={data}
          onChange={(e) => {
            setCurrency(e.currentTarget.value);
          }}
          value={currency}
          style={{ width: "100%" }}
        />

        <Button
          onClick={() => {
            let temp = currency;
            setCurrency(convertTo);
            setConvertTo(temp);
          }}
          style={{ width: "100%" }}
        >
          &#8645;
        </Button>
        <NativeSelect
          data={data}
          onChange={(e) => {
            setConvertTo(e.currentTarget.value);
          }}
          value={convertTo}
          style={{ width: "100%" }}
        />
        <span>{result ? result : 0}</span>
      </div>
    </div>
  );
}
