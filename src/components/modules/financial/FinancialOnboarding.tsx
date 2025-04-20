
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, Wallet, Target, TrendingUp, CreditCard, DollarSign, Sparkles } from "lucide-react";

const currencies = [
  { code: "USD", name: "US Dollar ($)", symbol: "$" },
  { code: "EUR", name: "Euro (€)", symbol: "€" },
  { code: "GBP", name: "British Pound (£)", symbol: "£" },
  { code: "JPY", name: "Japanese Yen (¥)", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan (¥)", symbol: "¥" },
  { code: "INR", name: "Indian Rupee (₹)", symbol: "₹" },
  { code: "CAD", name: "Canadian Dollar ($)", symbol: "$" },
  { code: "AUD", name: "Australian Dollar ($)", symbol: "$" },
  { code: "BRL", name: "Brazilian Real (R$)", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso ($)", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar ($)", symbol: "$" },
  { code: "CHF", name: "Swiss Franc (CHF)", symbol: "CHF" },
  { code: "ZAR", name: "South African Rand (R)", symbol: "R" },
  { code: "RUB", name: "Russian Ruble (₽)", symbol: "₽" },
];

// Group currencies with major ones at the top
const majorCurrencies = ["USD", "EUR", "GBP", "JPY", "CNY", "INR"];
const sortedCurrencies = [
  ...currencies.filter(c => majorCurrencies.includes(c.code)),
  ...currencies.filter(c => !majorCurrencies.includes(c.code))
];

const FinancialOnboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [userData, setUserData] = useState({
    financialIntent: "",
    reportingStyle: "",
    interactionLevel: "",
    currency: "USD",
    financialGoal: "",
    avatar: "beginner"
  });

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    setProgress(newStep * 20);
  };

  const prevStep = () => {
    const newStep = step - 1;
    setStep(newStep);
    setProgress(newStep * 20);
  };

  const handleComplete = () => {
    onComplete(userData);
  };

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Financial Journey</h1>
        <p className="text-muted-foreground">Let's personalize your financial dashboard in just a few steps</p>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2 w-full" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </div>

      {step === 1 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              What's your financial goal?
            </CardTitle>
            <CardDescription>Let us know what you want to achieve</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-lavender-50 ${userData.financialIntent === 'save' ? 'border-primary bg-lavender-50' : 'border-transparent bg-muted'}`}
                onClick={() => updateUserData({ financialIntent: 'save' })}
              >
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Save More</h3>
                </div>
                <p className="text-sm text-muted-foreground">Build emergency funds, save for big purchases, or just build wealth</p>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-lavender-50 ${userData.financialIntent === 'budget' ? 'border-primary bg-lavender-50' : 'border-transparent bg-muted'}`}
                onClick={() => updateUserData({ financialIntent: 'budget' })}
              >
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Budget Better</h3>
                </div>
                <p className="text-sm text-muted-foreground">Track spending, cut unnecessary expenses, and live within your means</p>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-lavender-50 ${userData.financialIntent === 'invest' ? 'border-primary bg-lavender-50' : 'border-transparent bg-muted'}`}
                onClick={() => updateUserData({ financialIntent: 'invest' })}
              >
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Grow Investments</h3>
                </div>
                <p className="text-sm text-muted-foreground">Start or expand your investment portfolio and grow your wealth</p>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-lavender-50 ${userData.financialIntent === 'debt' ? 'border-primary bg-lavender-50' : 'border-transparent bg-muted'}`}
                onClick={() => updateUserData({ financialIntent: 'debt' })}
              >
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Reduce Debt</h3>
                </div>
                <p className="text-sm text-muted-foreground">Create strategies to pay down debt and improve financial freedom</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => onComplete({...userData, reportingStyle: "summary"})}>
              Skip Setup
            </Button>
            <Button onClick={nextStep} disabled={!userData.financialIntent}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Choose Your Experience
            </CardTitle>
            <CardDescription>How would you like to view your financial data?</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" onValueChange={(value) => updateUserData({ reportingStyle: value })} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="summary">Quick Glance</TabsTrigger>
                <TabsTrigger value="detailed">Deep Dive</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="p-4 bg-muted rounded-md mb-4">
                <div className="flex items-start mb-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Quick Glance</h3>
                    <p className="text-sm text-muted-foreground mb-3">Simple summaries with essential information only. Perfect for busy people who want to stay on track with minimal effort.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Visual summaries with minimal numbers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Weekly check-ins under 1 minute</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Key insights and next steps only</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed" className="p-4 bg-muted rounded-md mb-4">
                <div className="flex items-start mb-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Award className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Deep Dive (Recommended)</h3>
                    <p className="text-sm text-muted-foreground mb-3">Get full insights, detailed reporting, and powerful analytics. Perfect for those who want complete control and understanding.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Comprehensive data analytics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Detailed breakdown of all categories</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Spending pattern analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Investment portfolio performance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                        <span>Custom reports and forecasting</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} disabled={!userData.reportingStyle}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Currency & Check-ins
            </CardTitle>
            <CardDescription>Set your preferred currency and check-in frequency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Preferred Currency</Label>
              <Select 
                defaultValue={userData.currency} 
                onValueChange={(value) => updateUserData({ currency: value })}
              >
                <SelectTrigger id="currency" className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {sortedCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>How often would you like to check in?</Label>
              <RadioGroup 
                defaultValue={userData.interactionLevel || "minimal"}
                onValueChange={(value) => updateUserData({ interactionLevel: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-3 rounded-md bg-muted">
                  <RadioGroupItem value="minimal" id="minimal" />
                  <Label htmlFor="minimal" className="cursor-pointer flex-1">
                    <div className="font-medium">Quick (1-2 min/week)</div>
                    <p className="text-sm text-muted-foreground">Just the essentials with minimal input required</p>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 rounded-md bg-muted">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="cursor-pointer flex-1">
                    <div className="font-medium">Balanced (3-5 min/week)</div>
                    <p className="text-sm text-muted-foreground">Regular updates with some details for better tracking</p>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 rounded-md bg-muted">
                  <RadioGroupItem value="deep" id="deep" />
                  <Label htmlFor="deep" className="cursor-pointer flex-1">
                    <div className="font-medium">Detailed (5-10 min/week)</div>
                    <p className="text-sm text-muted-foreground">Comprehensive tracking for maximum financial control</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} disabled={!userData.interactionLevel || !userData.currency}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              What's Your Money Goal?
            </CardTitle>
            <CardDescription>Tell us more about your specific financial target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="financial-goal">I want to...</Label>
                <Select 
                  onValueChange={(value) => updateUserData({ financialGoal: value })}
                  defaultValue={userData.financialGoal}
                >
                  <SelectTrigger id="financial-goal" className="w-full">
                    <SelectValue placeholder="Select a specific goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency-fund">Build an emergency fund</SelectItem>
                    <SelectItem value="save-purchase">Save for a major purchase</SelectItem>
                    <SelectItem value="debt-free">Become debt-free</SelectItem>
                    <SelectItem value="investment">Start investing regularly</SelectItem>
                    <SelectItem value="retirement">Plan for retirement</SelectItem>
                    <SelectItem value="budget">Create and stick to a budget</SelectItem>
                    <SelectItem value="travel">Save for travel</SelectItem>
                    <SelectItem value="other">Other goal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {userData.financialGoal === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="custom-goal">Describe your goal</Label>
                  <Input id="custom-goal" placeholder="My financial goal is..." />
                </div>
              )}

              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                We'll create personalized recommendations and tracking based on your specific goal
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} disabled={!userData.financialGoal}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 5 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>You're All Set!</CardTitle>
            <CardDescription>Your financial journey is ready to begin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Your Financial Dashboard is Ready</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                We've personalized your experience based on your preferences. You can always change these settings later.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Financial Goal</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {userData.financialIntent === 'save' ? 'Save More' : 
                     userData.financialIntent === 'budget' ? 'Budget Better' :
                     userData.financialIntent === 'invest' ? 'Grow Investments' : 'Reduce Debt'}
                  </p>
                </div>

                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Reporting Style</h4>
                  <p className="text-sm text-muted-foreground">
                    {userData.reportingStyle === 'summary' ? 'Quick Glance' : 'Deep Dive'}
                  </p>
                </div>

                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Currency</h4>
                  <p className="text-sm text-muted-foreground">
                    {currencies.find(c => c.code === userData.currency)?.name || userData.currency}
                  </p>
                </div>

                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Check-in Frequency</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {userData.interactionLevel}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={handleComplete}>Get Started</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default FinancialOnboarding;
