
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LifeAreaKey } from "@/types";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  areaKeys: z.array(z.string()).min(1, {
    message: "Select at least one life area.",
  }),
  mood: z.object({
    primary: z.string(),
    secondary: z.string().optional(),
    note: z.string().optional(),
  }),
  tags: z.array(z.string()).optional(),
});

type JournalEntryFormValues = z.infer<typeof formSchema>;

type JournalEntryFormProps = {
  onSubmit: (values: JournalEntryFormValues) => void;
  defaultValues?: Partial<JournalEntryFormValues>;
  areaKey?: LifeAreaKey;
  onCancel?: () => void;
};

const moodOptions = [
  "happy", "sad", "energetic", "tired", "focused",
  "distracted", "calm", "anxious", "productive", "frustrated",
  "motivated", "unmotivated", "creative", "bored", "grateful",
  "content", "stressed", "relaxed", "angry", "excited"
];

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ 
  onSubmit, 
  defaultValues, 
  areaKey, 
  onCancel 
}) => {
  const form = useForm<JournalEntryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      content: defaultValues?.content || "",
      areaKeys: defaultValues?.areaKeys || (areaKey ? [areaKey] : []),
      mood: defaultValues?.mood || {
        primary: "productive",
      },
      tags: defaultValues?.tags || [],
    },
  });

  const handleSubmit = (values: JournalEntryFormValues) => {
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
              <FormLabel>Entry Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title for your journal entry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your journal entry here..." 
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="areaKeys"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Life Areas</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {["professional", "health", "financial", "educational", "spiritual", "personal"].map((area) => (
                  <Button
                    key={area}
                    type="button"
                    variant={field.value.includes(area) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newValue = field.value.includes(area)
                        ? field.value.filter(val => val !== area)
                        : [...field.value, area];
                      field.onChange(newValue);
                    }}
                  >
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="mood.primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Mood</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {moodOptions.slice(0, 10).map((mood) => (
                  <Button
                    key={mood}
                    type="button"
                    variant={field.value === mood ? "default" : "outline"}
                    size="sm"
                    onClick={() => field.onChange(mood)}
                  >
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Add tags separated by commas" 
                  onBlur={(e) => {
                    const tags = e.target.value
                      .split(',')
                      .map(tag => tag.trim())
                      .filter(tag => tag !== '');
                    field.onChange(tags);
                  }}
                  defaultValue={field.value?.join(', ')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <DialogClose asChild>
            <Button type="submit">Save Entry</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default JournalEntryForm;
