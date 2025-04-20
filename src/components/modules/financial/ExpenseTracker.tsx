
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  LineChart, 
  Filter,
  Download,
  PlusCircle,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categoryEmojis = {
  "housing": "🏠",
  "food": "🍎",
  "transport": "🚗",
  "utilities": "💡",
  "entertainment": "🎭",
  "shopping": "🛍️",
  "health": "⚕️",
  "education": "📚",
  "personal": "👤",
  "travel": "✈️",
  "gifts": "🎁",
  "income": "💰",
  "salary": "💼",
  "investment": "📈",
  "other": "📋",
};

const moodEmojis = [
  { emoji: "😌", label: "Necessary" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😬", label: "Guilty" },
  { emoji: "🤔", label: "Unsure" },
  { emoji: "😎", label: "Worth it" },
];

// Sample transaction data
const transactionData = [
  { 
    id: 1, 
    type: "expense", 
    amount: 120.50, 
    category: "food", 
    date: "2024-07-20", 
    description: "Grocery Shopping",
    mood: "😌"
  },
  { 
    id: 2, 
    type: "expense", 
    amount: 85.20, 
    category: "utilities", 
    date: "2024-07-18", 
    description: "Utilities",
    mood: "😌"
  },
  { 
    id: 3, 
    type: "income", 
    amount: 3125.00, 
    category: "salary", 
    date: "2024-07-15", 
    description: "Salary Deposit",
    mood: "🎉"
  },
  { 
    id: 4, 
    type: "expense", 
    amount: 1500.00, 
    category: "housing", 
    date: "2024-07-02", 
    description: "Rent Payment",
    mood: "😌"
  },
  { 
    id: 5, 
    type: "expense", 
    amount: 45.75, 
    category: "entertainment", 
    date: "2024-07-10", 
    description: "Movie and dinner",
    mood: "😊"
  },
  { 
    id: 6, 
    type: "expense", 
    amount: 8.00, 
    category: "food", 
    date: "2024-07-12", 
    description: "Coffee Shop",
    mood: "😊"
  },
  { 
    id: 7, 
    type: "expense", 
    amount: 95.40, 
    category: "shopping", 
    date: "2024-07-05", 
    description: "New shoes",
    mood: "😊"
  },
  { 
    id: 8, 
    type: "expense", 
    amount: 35.00, 
    category: "transport", 
    date: "2024-07-08", 
    description: "Gas",
    mood: "😌"
  }
];

const ExpenseTracker = ({ currency = "USD", reportingStyle = "summary" }) => {
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    mood: "😌"
  });
  const [view, setView] = useState("all");
  const [transactions, setTransactions] = useState(transactionData);

  const getCurrencySymbol = (code) => {
    switch(code) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "JPY": return "¥";
      default: return "$";
    }
  };

  const symbol = getCurrencySymbol(currency);
  
  const filteredTransactions = view === "all" 
    ? transactions 
    : view === "income" 
      ? transactions.filter(t => t.type === "income")
      : transactions.filter(t => t.type === "expense");
  
  const handleAddTransaction = () => {
    const newEntry = {
      id: transactions.length + 1,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString().split('T')[0]
    };
    
    setTransactions([newEntry, ...transactions]);
    setShowNewTransaction(false);
    setNewTransaction({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      mood: "😌"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Money Flow</h1>
          <p className="text-muted-foreground">Track your income and expenses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="gap-1" onClick={() => setShowNewTransaction(true)}>
            <Plus className="h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>

      {showNewTransaction && (
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle>New Transaction</CardTitle>
            <CardDescription>Record your income or expense</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transaction-type">Type</Label>
                  <Select 
                    defaultValue={newTransaction.type}
                    onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
                  >
                    <SelectTrigger id="transaction-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {symbol}
                    </span>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="0.00" 
                      className="pl-8"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {newTransaction.type === "expense" ? (
                        <>
                          <SelectItem value="housing">🏠 Housing</SelectItem>
                          <SelectItem value="food">🍎 Food</SelectItem>
                          <SelectItem value="transport">🚗 Transport</SelectItem>
                          <SelectItem value="utilities">💡 Utilities</SelectItem>
                          <SelectItem value="entertainment">🎭 Entertainment</SelectItem>
                          <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                          <SelectItem value="health">⚕️ Health</SelectItem>
                          <SelectItem value="education">📚 Education</SelectItem>
                          <SelectItem value="personal">👤 Personal</SelectItem>
                          <SelectItem value="travel">✈️ Travel</SelectItem>
                          <SelectItem value="gifts">🎁 Gifts</SelectItem>
                          <SelectItem value="other">📋 Other</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="salary">💼 Salary</SelectItem>
                          <SelectItem value="investment">📈 Investment</SelectItem>
                          <SelectItem value="gift">🎁 Gift</SelectItem>
                          <SelectItem value="other">📋 Other</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    placeholder="What was this for?" 
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  />
                </div>
              </div>
              
              {newTransaction.type === "expense" && (
                <div>
                  <Label>How did this purchase make you feel?</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {moodEmojis.map((item) => (
                      <Button
                        key={item.emoji}
                        type="button"
                        variant={newTransaction.mood === item.emoji ? "default" : "outline"}
                        className="h-auto py-1.5 px-3"
                        onClick={() => setNewTransaction({...newTransaction, mood: item.emoji})}
                      >
                        <span className="mr-1">{item.emoji}</span> {item.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowNewTransaction(false)}>Cancel</Button>
            <Button 
              onClick={handleAddTransaction}
              disabled={!newTransaction.amount || !newTransaction.category}
            >
              <Check className="h-4 w-4 mr-1" /> Save Transaction
            </Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Recent Transactions</CardTitle>
                  <CardDescription>Your financial activity</CardDescription>
                </div>
                <div>
                  <div className="flex border rounded-md overflow-hidden">
                    <Button 
                      variant={view === "all" ? "default" : "ghost"} 
                      size="sm" 
                      className="rounded-none"
                      onClick={() => setView("all")}
                    >
                      All
                    </Button>
                    <Button 
                      variant={view === "income" ? "default" : "ghost"} 
                      size="sm" 
                      className="rounded-none"
                      onClick={() => setView("income")}
                    >
                      Income
                    </Button>
                    <Button 
                      variant={view === "expense" ? "default" : "ghost"} 
                      size="sm" 
                      className="rounded-none"
                      onClick={() => setView("expense")}
                    >
                      Expenses
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mt-4">
                {filteredTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 ${transaction.type === 'income' ? 'bg-green-100' : 'bg-lavender-100'} rounded-full flex items-center justify-center`}>
                        <span className="text-lg">{categoryEmojis[transaction.category] || '📋'}</span>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} · {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{symbol}{transaction.amount.toFixed(2)}
                      </p>
                      {transaction.mood && (
                        <p className="text-xs text-muted-foreground">{transaction.mood} {moodEmojis.find(m => m.emoji === transaction.mood)?.label || ''}</p>
                      )}
                    </div>
                  </div>
                ))}

                {filteredTransactions.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No transactions to display</p>
                    <Button 
                      variant="ghost" 
                      className="mt-2"
                      onClick={() => setShowNewTransaction(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add your first transaction
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            {filteredTransactions.length > 0 && (
              <CardFooter className="flex justify-center">
                <Button variant="outline">View More Transactions</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Spending Trends
              </CardTitle>
              <CardDescription>See how your money flow changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground ml-2">Your spending patterns will appear here</p>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Spending Insights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <p className="text-sm font-medium mb-1">Top Spending Category</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏠</span>
                      <span>Housing (35%)</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <p className="text-sm font-medium mb-1">Most Frequent Purchase</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🍎</span>
                      <span>Groceries (8 times)</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <p className="text-sm font-medium mb-1">Spending Mood</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">😌</span>
                      <span>Mostly Necessary Purchases</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <p className="text-sm font-medium mb-1">Week vs Previous</p>
                    <div className="flex items-center gap-2 text-green-500">
                      <ArrowDown className="h-4 w-4" />
                      <span>12% Less Spent</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recurring">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Recurring Transactions
              </CardTitle>
              <CardDescription>Manage your regular income and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Income</h3>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">💼</span>
                      </div>
                      <div>
                        <p className="font-medium">Salary</p>
                        <p className="text-xs text-muted-foreground">Monthly · 15th</p>
                      </div>
                    </div>
                    <p className="font-medium text-green-500">+{symbol}3,125.00</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <h3 className="font-medium">Expenses</h3>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-lavender-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">🏠</span>
                      </div>
                      <div>
                        <p className="font-medium">Rent</p>
                        <p className="text-xs text-muted-foreground">Monthly · 1st</p>
                      </div>
                    </div>
                    <p className="font-medium text-red-500">-{symbol}1,500.00</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-lavender-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">💡</span>
                      </div>
                      <div>
                        <p className="font-medium">Utilities</p>
                        <p className="text-xs text-muted-foreground">Monthly · 15th</p>
                      </div>
                    </div>
                    <p className="font-medium text-red-500">-{symbol}85.00</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-lavender-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">🌐</span>
                      </div>
                      <div>
                        <p className="font-medium">Internet</p>
                        <p className="text-xs text-muted-foreground">Monthly · 20th</p>
                      </div>
                    </div>
                    <p className="font-medium text-red-500">-{symbol}75.00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpenseTracker;
