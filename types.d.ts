interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  indexed: boolean;
}

interface CatCardProps {
  id: number;
  title: string;
  desc: string;
  img: string;
}

interface ProjCardProps {
  id: number;
  img: string;
  pp: string;
  cat: string;
  username: string;
}
interface GigsProps {
  Basic: {
    deliveryTime: number;
    description: string;
    features: string[];
    price: number;
    revisionNumber: number;
    title: string;
    _id: string;
  };

  Premium: {
    deliveryTime: number;
    description: string;
    features: string[];
    price: number;
    revisionNumber: number;
    title: string;
    _id: string;
  };

  Standrad: {
    deliveryTime: number;
    description: string;
    features: string[];
    price: number;
    revisionNumber: number;
    title: string;
    _id: string;
  };
  buyers: string[];
  averageRating: number;
  category: string[];
  coverImage: string;
  createdAt: Date;
  description: string;
  images: string[];
  numOfReviews: number;
  sales: number;
  title: string;
  updatedAt: Date;
  userId: string;
  _id: string;
}

interface MoreDetailsProps {
  id?: number;
  title: string;
  desc: string;
}
interface ReviewProps {
  _id: string;
  rating: number;
  desc: string;
  gigId: string;
  userId: string;
  createdAt: Date;
}

interface MyGigsProps {
  id: number;
  img: string;
  pp: string;
  desc: string;
  price: number;
  star: number;
  username: string;
  title: string;
  sales: number;
}

interface MyOrdersProps extends MyGigsProps {
  buyer: string;
  buyerId: number;
}

interface MyMessagesProps {
  id: number;
  buyer: string;
  message: string;
  sendAt: string;
  read: boolean;
}

interface CategoriesProps {
  id: string;
  title: string;
  subTitle: string;
  cat: string;
  image: string;
}

interface OrdersProps {
  buyerId: string;
  createdAt: Date;
  gigId: string;
  img: string;
  isCompleted: boolean;
  payment_intent: string;
  price: number;
  qty: number;
  sellerId: string;
  title: string;
  totalPrice: number;
  updatedAt: Date;

  _id: string;
}

interface ConvProps {
  buyerId: string;
  createdAt: Date;
  lastMessage: string;
  readByBuyer: string;
  readBySeller: string;
  sellerId: string;
  updatedAt: Date;
  _id: string;
}
