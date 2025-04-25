
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookOpen, Book, Plus, GraduationCap, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import GoalForm from "@/components/forms/GoalForm";
import HabitForm from "@/components/forms/HabitForm";
import { dataStore } from "@/lib/dataManager";
import { Goal, Habit, Resource } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Form for adding a new skill
const SkillForm = ({ onSubmit }: { onSubmit: (skill: { name: string, level: number }) => void }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(50);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name, level });
      setName("");
      setLevel(50);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="skillName" className="block text-sm font-medium mb-1">Skill Name</label>
        <input
          id="skillName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter skill name"
          required
        />
      </div>
      
      <div>
        <label htmlFor="skillLevel" className="block text-sm font-medium mb-1">
          Proficiency Level: {level}%
        </label>
        <input
          id="skillLevel"
          type="range"
          min="0"
          max="100"
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Add Skill</Button>
      </div>
    </form>
  );
};

// Form for adding a new book
const BookForm = ({ onSubmit }: { onSubmit: (book: { title: string, author: string }) => void }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, author });
      setTitle("");
      setAuthor("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bookTitle" className="block text-sm font-medium mb-1">Book Title</label>
        <input
          id="bookTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter book title"
          required
        />
      </div>
      
      <div>
        <label htmlFor="bookAuthor" className="block text-sm font-medium mb-1">Author</label>
        <input
          id="bookAuthor"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter author name"
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Add Book</Button>
      </div>
    </form>
  );
};

// Form for adding study notes
const NoteForm = ({ onSubmit }: { onSubmit: (note: { title: string, content: string }) => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      setTitle("");
      setContent("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="noteTitle" className="block text-sm font-medium mb-1">Note Title</label>
        <input
          id="noteTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter note title"
          required
        />
      </div>
      
      <div>
        <label htmlFor="noteContent" className="block text-sm font-medium mb-1">Content</label>
        <textarea
          id="noteContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-md min-h-[150px]"
          placeholder="Enter note content"
          required
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Save Note</Button>
      </div>
    </form>
  );
};

// Form for adding a new study session
const StudySessionForm = ({ onSubmit }: { onSubmit: (session: { subject: string, duration: number }) => void }) => {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(30);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim()) {
      onSubmit({ subject, duration });
      setSubject("");
      setDuration(30);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="What are you studying?"
          required
        />
      </div>
      
      <div>
        <label htmlFor="duration" className="block text-sm font-medium mb-1">
          Duration: {duration} minutes
        </label>
        <input
          id="duration"
          type="range"
          min="5"
          max="180"
          step="5"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Start Session</Button>
      </div>
    </form>
  );
};

// Educational module component
const Educational = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [skills, setSkills] = useState<{ name: string; level: number }[]>([
    { name: "JavaScript", level: 85 },
    { name: "React", level: 65 },
    { name: "Python", level: 35 },
  ]);
  const [books, setBooks] = useState<any[]>([
    { 
      id: 1, 
      title: "Atomic Habits", 
      author: "James Clear", 
      progress: 65, 
      status: "reading" 
    },
    { 
      id: 2, 
      title: "Deep Work", 
      author: "Cal Newport", 
      progress: 30, 
      status: "reading" 
    },
    { 
      id: 3, 
      title: "The Pragmatic Programmer", 
      author: "Andrew Hunt & David Thomas", 
      progress: 100, 
      status: "completed" 
    },
  ]);
  const [courses, setCourses] = useState<any[]>([
    { 
      id: 1, 
      title: "React Advanced Patterns", 
      provider: "Frontend Masters", 
      progress: 65, 
      status: "in_progress", 
      type: "Online Course",
      estimatedCompletion: "Aug 15, 2024"
    },
    { 
      id: 2, 
      title: "Machine Learning Basics", 
      provider: "Coursera", 
      progress: 15, 
      status: "just_started", 
      type: "Video Course",
      estimatedCompletion: "Oct 30, 2024"
    },
    { 
      id: 3, 
      title: "AWS Cloud Practitioner", 
      provider: "Amazon Web Services", 
      progress: 85, 
      status: "almost_done", 
      type: "Certificate Course",
      estimatedCompletion: "Aug 5, 2024"
    },
  ]);
  
  // Fetch goals and habits on component mount
  useEffect(() => {
    const allGoals = dataStore.getGoals();
    const educationalGoals = allGoals.filter(goal => goal.areaKey === "educational");
    setGoals(educationalGoals);
    
    const allHabits = dataStore.getHabits();
    const educationalHabits = allHabits.filter(habit => habit.areaKey === "educational");
    setHabits(educationalHabits);
  }, []);
  
  // Handle adding new goal
  const handleAddGoal = (values: any) => {
    const newGoal = dataStore.addGoal({
      title: values.title,
      description: values.description,
      areaKey: values.areaKey,
      priority: values.priority,
      deadline: values.deadline,
      progress: 0,
      status: 'not_started',
      subTasks: [],
    });
    
    if (values.areaKey === "educational") {
      setGoals([...goals, newGoal]);
    }
  };
  
  // Handle adding new habit
  const handleAddHabit = (values: any) => {
    const newHabit = dataStore.addHabit({
      title: values.title,
      description: values.description || "",
      areaKey: values.areaKey,
      frequency: values.frequency,
      timeOfDay: values.timeOfDay,
      daysOfWeek: values.daysOfWeek,
      status: 'active',
    });
    
    if (values.areaKey === "educational") {
      setHabits([...habits, newHabit]);
    }
  };
  
  // Handle updating book progress
  const handleUpdateBookProgress = (id: number, progress: number) => {
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return { 
          ...book, 
          progress,
          status: progress === 100 ? "completed" : "reading"
        };
      }
      return book;
    });
    setBooks(updatedBooks);
    toast({
      title: "Book progress updated",
      description: `Progress updated to ${progress}%`,
    });
  };
  
  // Handle adding a new book
  const handleAddBook = (book: { title: string, author: string }) => {
    const newBook = {
      id: books.length + 1,
      title: book.title,
      author: book.author,
      progress: 0,
      status: "reading"
    };
    setBooks([...books, newBook]);
    toast({
      title: "Book added",
      description: `"${book.title}" has been added to your reading list`,
    });
  };
  
  // Handle adding a new skill
  const handleAddSkill = (skill: { name: string, level: number }) => {
    setSkills([...skills, skill]);
    toast({
      title: "Skill added",
      description: `${skill.name} has been added to your skills`,
    });
  };
  
  // Handle adding a note
  const handleAddNote = (note: { title: string, content: string }) => {
    // In a real app, this would store the note in state or backend
    toast({
      title: "Study note saved",
      description: `"${note.title}" has been saved to your notes`,
    });
  };
  
  // Handle starting a study session
  const handleStartStudySession = (session: { subject: string, duration: number }) => {
    toast({
      title: "Study session started",
      description: `${session.subject} session for ${session.duration} minutes started`,
    });
    
    // In a real app, this would start a timer and track the session
  };

  return (
    <div className="container mx-auto animate-fade-in pb-20">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning & Education</h1>
            <p className="text-muted-foreground">
              Track knowledge acquisition, skills development, and learning goals
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> New Learning Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Learning Goal</DialogTitle>
              </DialogHeader>
              <GoalForm 
                onSubmit={handleAddGoal} 
                areaKey="educational" 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Learning Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <h3 className="text-2xl font-bold">{courses.filter(c => c.progress < 100).length}</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">
                {courses.filter(c => {
                  const date = new Date(c.estimatedCompletion);
                  const currentMonth = new Date().getMonth();
                  return date.getMonth() === currentMonth;
                }).length} due this month
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Study Hours</p>
                <h3 className="text-2xl font-bold">42</h3>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Books Reading</p>
                <h3 className="text-2xl font-bold">{books.filter(b => b.status === "reading").length}</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">
                {books.filter(b => b.status === "completed").length} completed this year
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Skills Added</p>
                <h3 className="text-2xl font-bold">{skills.length}</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">This year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="books">Reading</TabsTrigger>
          <TabsTrigger value="notes">Study Notes</TabsTrigger>
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="tracking">Time Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map(course => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={`
                      ${course.status === 'just_started' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                        course.status === 'in_progress' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : 
                        'bg-primary/10 text-primary hover:bg-primary/20'}
                    `}>
                      {course.status === 'just_started' ? 'Just Started' : 
                       course.status === 'in_progress' ? 'In Progress' : 
                       'Almost Done'}
                    </Badge>
                    <Badge variant="outline">{course.type}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-muted-foreground">Estimated completion</span>
                      <span className="font-medium">{course.estimatedCompletion}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm">Continue</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Plus className="h-4 w-4" /> Add New Course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Enter course name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Provider</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Enter provider name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="Online Course">Online Course</option>
                      <option value="Video Course">Video Course</option>
                      <option value="Certificate Course">Certificate Course</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Expected Completion Date</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => toast({ title: "Course added", description: "New course has been added to your list" })}>
                      Add Course
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Skills Portfolio</CardTitle>
              <CardDescription>
                Track your skills and expertise levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-5">
                  <h3 className="font-medium">Technical Skills</h3>
                  
                  <div className="space-y-3">
                    {skills.filter(skill => skill.level >= 50).map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level >= 80 ? 'Advanced' : skill.level >= 50 ? 'Intermediate' : 'Beginner'}
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-5">
                  <h3 className="font-medium">Learning Skills</h3>
                  
                  <div className="space-y-3">
                    {skills.filter(skill => skill.level < 50).map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level >= 80 ? 'Advanced' : skill.level >= 50 ? 'Intermediate' : 'Beginner'}
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-5">
                  <h3 className="font-medium">Add New Skill</h3>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full gap-1">
                        <Plus className="h-4 w-4" /> Add New Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Skill</DialogTitle>
                      </DialogHeader>
                      <SkillForm onSubmit={handleAddSkill} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="books" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map(book => (
              <Card key={book.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-3">
                    <div className="h-32 w-24 bg-muted flex items-center justify-center rounded-md">
                      <Book className="h-10 w-10 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                  <CardTitle className="text-lg text-center">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-center">{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-2" />
                    
                    <div className="flex justify-center pt-2">
                      <Badge 
                        variant={book.status === "completed" ? "default" : "outline"}
                        className={book.status === "completed" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {book.status === "completed" ? "Completed" : "Currently Reading"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Update Progress</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Reading Progress</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Current Progress: {book.progress}%
                          </label>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={book.progress}
                            onChange={(e) => handleUpdateBookProgress(book.id, parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                        <div className="pt-4">
                          <Button 
                            onClick={() => handleUpdateBookProgress(book.id, 100)}
                            className="w-full"
                          >
                            Mark as Completed
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="gap-1">
                      <Plus className="h-5 w-5" />
                      Add New Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Book</DialogTitle>
                    </DialogHeader>
                    <BookForm onSubmit={handleAddBook} />
                  </DialogContent>
                </Dialog>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Track your reading progress
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Study Notes & Knowledge Base</CardTitle>
              <CardDescription>Capture and organize your learning notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Start capturing your learning notes</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add New Note</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Add New Study Note</DialogTitle>
                    </DialogHeader>
                    <NoteForm onSubmit={handleAddNote} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map(goal => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    {goal.title}
                  </CardTitle>
                  <CardDescription>
                    {goal.deadline ? `Target by ${new Date(goal.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}` : 'Ongoing'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    
                    <div className="space-y-2 mt-4">
                      {goal.subTasks && goal.subTasks.length > 0 ? (
                        goal.subTasks.map(task => (
                          <div key={task.id} className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{task.title}</span>
                            <Badge variant={task.completed ? "default" : "outline"} className={task.completed ? "bg-green-100 text-green-800" : ""}>
                              {task.completed ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">No subtasks defined</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="gap-1">
                      <Plus className="h-5 w-5" />
                      Add New Learning Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Learning Goal</DialogTitle>
                    </DialogHeader>
                    <GoalForm onSubmit={handleAddGoal} areaKey="educational" />
                  </DialogContent>
                </Dialog>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Set targets for your education and learning
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tracking" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Study Time Tracking</CardTitle>
              <CardDescription>Monitor your learning hours and productivity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Track your study sessions to improve focus and productivity</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Start Study Session</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start New Study Session</DialogTitle>
                    </DialogHeader>
                    <StudySessionForm onSubmit={handleStartStudySession} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Educational;
