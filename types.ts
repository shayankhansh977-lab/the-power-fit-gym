
export interface GymClass {
  id: string;
  name: string;
  trainer: string;
  time: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  capacity: number;
  availableSpots: number;
  category: 'Yoga' | 'HIIT' | 'Strength' | 'Cardio';
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
}

export interface FitnessGoal {
  targetWeight: number;
  currentWeight: number;
  goalType: 'Muscle Gain' | 'Fat Loss' | 'Endurance';
  activityLevel: string;
  equipment: string[];
}

export interface ProgressPrediction {
  estimatedGoalDate: string;
  monthlyProgressRate: number;
  burnRate: number;
  confidenceScore: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Fixed missing Car interface for components/CarCard.tsx and pages/Recommendations.tsx
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  type: string;
  fuelType: string;
  mileage: number;
  transmission: string;
  image: string;
  status: 'available' | 'sold' | 'reserved';
}

// Fixed missing UserPreferences interface for pages/Recommendations.tsx
export interface UserPreferences {
  budget: number;
  type: string;
  primaryUse: string;
  passengerCapacity: number;
}
