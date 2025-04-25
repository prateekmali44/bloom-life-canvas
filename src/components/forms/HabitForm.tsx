
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LifeAreaKey } from "@/types";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  areaKey: z.enum(["professional", "health", "financial", "educational", "spiritual", "personal"]),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  timeOfDay: z.string().optional(),
  daysOfWeek: z.array(z.number()).optional(),
});

type HabitFormValues = z.infer<typeof formSchema>;

type HabitFormProps = {
  onSubmit: (values: HabitFormValues) => void;
  defaultValues?: Partial<HabitFormValues>;
  areaKey?: LifeAreaKey;
  onCancel?: () => void;
};

const daysOfWeek = [
  { id: 0, label: "Sunday" },
  { id: 1, label: "Monday" },
  { id: 2, label: "Tuesday" },
  { id: 3, label: "Wednesday" },
  { id: 4, label: "Thursday" },
  { id: 5, label: "Friday" },
  { id: 6, label: "Saturday" },
];

const HabitForm: React.FC<HabitFormProps> = ({ 
  onSubmit, 
  defaultValues, 
  areaKey, 
  onCancel 
}) => {
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      areaKey: defaultValues?.areaKey || areaKey || "professional",
      frequency: defaultValues?.frequency || "daily",
      timeOfDay: defaultValues?.timeOfDay || "",
      daysOfWeek: defaultValues?.daysOfWeek || [],
    },
  });
  
  const watchFrequency = form.watch("frequency");

  const handleSubmit = (values: HabitFormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your habit title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your habit (optional)" 
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="areaKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Life Area</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a life area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {watchFrequency === "daily" && (
          <FormField
            control={form.control}
            name="timeOfDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Time</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time of day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  What time of day do you prefer to complete this habit?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {watchFrequency === "weekly" && (
          <FormField
            control={form.control}
            name="daysOfWeek"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Days of Week</FormLabel>
                  <FormDescription>
                    Which days of the week do you want to perform this habit?
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {daysOfWeek.map((day) => (
                    <FormField
                      key={day.id}
                      control={form.control}
                      name="daysOfWeek"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={day.id}
                            className="flex items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day.id)}
                                onCheckedChange={(checked) => {
                                  const current = [...(field.value || [])];
                                  if (checked) {
                                    if (!current.includes(day.id)) {
                                      field.onChange([...current, day.id]);
                                    }
                                  } else {
                                    field.onChange(
                                      current.filter((value) => value !== day.id)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {day.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <DialogClose asChild>
            <Button type="submit">Save Habit</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default HabitForm;
