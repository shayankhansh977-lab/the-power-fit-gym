
import { GymClass, Trainer, Car } from './types';

export const GYM_CLASSES: GymClass[] = [
  {
    id: '1',
    name: 'Sunrise Power Yoga',
    trainer: 'Sarah Zen',
    time: '06:00 AM',
    duration: '60 min',
    intensity: 'Low',
    capacity: 20,
    availableSpots: 5,
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'HIIT Inferno',
    trainer: 'Marcus Bolt',
    time: '05:30 PM',
    duration: '45 min',
    intensity: 'High',
    capacity: 15,
    availableSpots: 2,
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Iron Strength 101',
    trainer: 'Jax Steele',
    time: '07:00 PM',
    duration: '90 min',
    intensity: 'High',
    capacity: 10,
    availableSpots: 0,
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Core & Flow',
    trainer: 'Elena Rose',
    time: '12:00 PM',
    duration: '30 min',
    intensity: 'Medium',
    capacity: 25,
    availableSpots: 18,
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Marcus Bolt',
    specialty: 'High Performance HIIT',
    bio: 'Former athlete specializing in explosive power and fat loss.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?auto=format&fit=crop&q=80&w=400',
    rating: 4.9
  },
  {
    id: 't2',
    name: 'Sarah Zen',
    specialty: 'Mindful Yoga & Mobility',
    bio: 'Helping you find balance between strength and flexibility.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400',
    rating: 4.8
  }
];

export const APP_NAME = "FitAI";

// Fixed missing INITIAL_CARS for pages/Marketplace.tsx and pages/Recommendations.tsx
export const INITIAL_CARS: Car[] = [
  {
    id: 'c1',
    make: 'Tesla',
    model: 'Model Y',
    year: 2023,
    price: 52990,
    type: 'SUV',
    fuelType: 'Electric',
    mileage: 0,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
    status: 'available'
  },
  {
    id: 'c2',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2022,
    price: 78500,
    type: 'Sports',
    fuelType: 'Gasoline',
    mileage: 12000,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d6274a?auto=format&fit=crop&q=80&w=800',
    status: 'available'
  },
  {
    id: 'c3',
    make: 'Rivian',
    model: 'R1S',
    year: 2024,
    price: 92000,
    type: 'SUV',
    fuelType: 'Electric',
    mileage: 500,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1672322316401-499313264c92?auto=format&fit=crop&q=80&w=800',
    status: 'available'
  }
];
