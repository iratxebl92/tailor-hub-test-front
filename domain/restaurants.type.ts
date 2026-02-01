export interface LatLng {
  lat: number;
  lng: number;
}

export interface OperatingHours {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface Review {
  name: string;
  date: string;
  rating: number;
  comments: string;
}

export interface Restaurant {
  id: number;
  name: string;
  neighborhood: string;
  photograph: string;
  address: string;
  latlng: LatLng;
  image: string;
  cuisine_type: string;
  operating_hours: OperatingHours;
  reviews: Review[];
}

export type RestaurantCardType = {
  id: number;
  name: string;
  address: string;
  image: string;
  rating: number;
  commentsCount: number;
}

export type Comment = {
  id: number;
  author: string;
  rating: number;
  text: string;
  isOwn: boolean;
}
