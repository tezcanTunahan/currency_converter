"use client";
import { NativeSelect, TextInput, rem } from "@mantine/core";
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
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("eur");
  const [convertTo, setConvertTo] = useState("eur");
  const [result, setResult] = useState(0);

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
  ];

  const select = (
    <NativeSelect
      data={data}
      onChange={(e) => {
        setCurrency(e.currentTarget.value);
      }}
      styles={{
        input: {
          width: rem(110),
        },
      }}
    />
  );

  return (
    <div className="converter">
      <TextInput
        onChange={(e) => {
          setAmount(Number(e.currentTarget.value));
        }}
        type="number"
        placeholder="Enter amount"
        label="Convert amount"
        rightSection={select}
        rightSectionWidth={92}
      />

      <span>to</span>
      <NativeSelect
        data={data}
        onChange={(e) => {
          setConvertTo(e.currentTarget.value);
        }}
      />
      <span>=</span>
      <span>{result}</span>
    </div>
  );
}
