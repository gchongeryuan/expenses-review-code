"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { PlusCircle, DollarSign, PieChart, ArrowUpDown } from "lucide-react";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Others"
  ];

  const addExpense = () => {
    if (!amount || !category) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString()
    };

    setExpenses([newExpense, ...expenses]);
    setAmount("");
    setCategory("");
    setDescription("");
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Expense Tracker</h1>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">
                Total: ${totalExpenses.toFixed(2)}
              </span>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="md:col-span-1"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="md:col-span-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="md:col-span-1"
            />
            <Button onClick={addExpense} className="md:col-span-1">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Expense
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Expenses</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="w-4 h-4 mr-2" /> Sort
                </Button>
                <Button variant="outline" size="sm">
                  <PieChart className="w-4 h-4 mr-2" /> Analytics
                </Button>
              </div>
            </div>
            <div className="divide-y">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{expense.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.description || "No description"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
              {expenses.length === 0 && (
                <p className="py-4 text-center text-muted-foreground">
                  No expenses recorded yet
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}