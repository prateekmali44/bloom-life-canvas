
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Check, 
  X, 
  Zap, 
  AlertCircle, 
  ArrowRight, 
  FileCheck,
  DollarSign
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const moodEmojis = [
  { emoji: "😀", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😕", label: "Concerned" },
  { emoji: "😩", label: "Stressed" }
];

const WeeklyCheckIn = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    unexpected: false,
    unexpectedSpend: "",
    unexpectedCategory: "",
    unexpectedMood: "😐",
    financialMood: "🙂",
    nextWeekSpending: "same"
  });
  const [checkInCompleted, setCheckInCompleted] = useState(false);

  const updateData = (updates) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const completeCheckIn = () => {
    setCheckInCompleted(true);
    // This would typically save the data to state or localStorage
    console.log("Weekly check-in completed:", data);
  };

  if (checkInCompleted) {
    return (
      <Card className="bg-green-50 border-green-100 mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <FileCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-1">Weekly Check-in Complete!</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Thanks for the update. We've adjusted your financial dashboard with your latest information.
            </p>
            <Button variant="outline" size="sm">
              View Updated Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-600" />
          Weekly Financial Check-in
        </CardTitle>
        <CardDescription>
          Quick 1-minute update to keep your financial picture accurate
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Any unexpected expenses or income this week? This helps us stay accurate.
            </p>
            
            <div className="flex gap-3">
              <Button 
                variant={data.unexpected ? "default" : "outline"} 
                className={`flex-1 ${data.unexpected ? "" : "border-2"}`}
                onClick={() => updateData({ unexpected: true })}
              >
                <Check className="h-4 w-4 mr-2" /> Yes
              </Button>
              <Button 
                variant={data.unexpected === false ? "default" : "outline"} 
                className={`flex-1 ${data.unexpected === false ? "" : "border-2"}`}
                onClick={() => updateData({ unexpected: false })}
              >
                <X className="h-4 w-4 mr-2" /> No
              </Button>
            </div>
            
            {data.unexpected && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input 
                        id="amount" 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-8"
                        value={data.unexpectedSpend}
                        onChange={(e) => updateData({ unexpectedSpend: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                      value={data.unexpectedCategory}
                      onChange={(e) => updateData({ unexpectedCategory: e.target.value })}
                    >
                      <option value="">Select category</option>
                      <option value="housing">🏠 Housing</option>
                      <option value="food">🍎 Food</option>
                      <option value="transport">🚗 Transport</option>
                      <option value="utilities">💡 Utilities</option>
                      <option value="entertainment">🎭 Entertainment</option>
                      <option value="shopping">🛍️ Shopping</option>
                      <option value="health">⚕️ Health</option>
                      <option value="other">📋 Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>How do you feel about this expense?</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {moodEmojis.map((item) => (
                      <Button
                        key={item.emoji}
                        type="button"
                        variant={data.unexpectedMood === item.emoji ? "default" : "outline"}
                        className="h-auto py-1.5 px-3"
                        onClick={() => updateData({ unexpectedMood: item.emoji })}
                      >
                        <span className="mr-1">{item.emoji}</span> {item.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              How do you feel about your finances this week?
            </p>
            
            <div className="grid grid-cols-5 gap-2">
              {moodEmojis.map((item) => (
                <Button
                  key={item.emoji}
                  type="button"
                  variant={data.financialMood === item.emoji ? "default" : "outline"}
                  className="flex-col h-auto py-3"
                  onClick={() => updateData({ financialMood: item.emoji })}
                >
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span className="text-xs">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              What do you expect for next week's spending?
            </p>
            
            <RadioGroup 
              defaultValue={data.nextWeekSpending}
              onValueChange={(value) => updateData({ nextWeekSpending: value })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 rounded-md bg-white border">
                <RadioGroupItem value="less" id="less" />
                <Label htmlFor="less" className="cursor-pointer flex-1">
                  <div className="font-medium">Spending less</div>
                  <p className="text-sm text-muted-foreground">Planning to cut back or no major expenses</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-md bg-white border">
                <RadioGroupItem value="same" id="same" />
                <Label htmlFor="same" className="cursor-pointer flex-1">
                  <div className="font-medium">About the same</div>
                  <p className="text-sm text-muted-foreground">Expecting a typical week</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-md bg-white border">
                <RadioGroupItem value="more" id="more" />
                <Label htmlFor="more" className="cursor-pointer flex-1">
                  <div className="font-medium">Spending more</div>
                  <p className="text-sm text-muted-foreground">Planning larger purchases or special events</p>
                </Label>
              </div>
            </RadioGroup>
            
            {data.nextWeekSpending === "more" && (
              <div className="p-3 bg-amber-100 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Planning higher spending helps you adjust your budget in advance. Consider updating your budget allocations.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>Back</Button>
        ) : (
          <Button variant="outline" onClick={() => setCheckInCompleted(true)}>Skip</Button>
        )}
        
        {step < 3 ? (
          <Button onClick={nextStep} disabled={data.unexpected && (!data.unexpectedSpend || !data.unexpectedCategory)}>
            Continue <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={completeCheckIn}>
            Complete Check-in <Check className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WeeklyCheckIn;
