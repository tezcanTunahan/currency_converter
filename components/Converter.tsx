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
  getData(amount, currency, convertTo).then((data) => {
    setResult(data.result);
  });

  const data = [
    { value: "eur", label: "🇪🇺 EUR" },
    { value: "usd", label: "🇺🇸 USD" },
    { value: "cad", label: "🇨🇦 CAD" },
    { value: "gbp", label: "🇬🇧 GBP" },
    { value: "aud", label: "🇦🇺 AUD" },
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
    <div>
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
      <NativeSelect
        data={data}
        onChange={(e) => {
          setConvertTo(e.currentTarget.value);
        }}
      />
      {result}
    </div>
  );
}
