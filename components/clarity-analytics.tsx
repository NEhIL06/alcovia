"use client";
import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function ClarityAnalytics() {
  useEffect(() => {
    Clarity.init("vy2qj0kssf");
  }, []);
  return null;
}
