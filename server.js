const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const port = 3000;

// --- MongoDB Setup ---
mongoose.connect('mongodb+srv://ronitmunde29:ronnnnit@fairbnbdemo.7a0ntoi.mongodb.net/?retryWrites=true&w=majority&appName=FairbnbDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));
// --- MongoDB Schemas ---
// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
  user_email: String,
  package_id: String,
  package_name: String,
  amount: Number,
  date: Date
});

//Booking Schema
const BookingSchema = new mongoose.Schema({
  userId: String,
  packages: Array,
  total: Number,
  date: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);
const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- DevRev API Token Generation ---

const DEVREV_AAT = 'eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJPSkJ0bFN3a2s6ZGV2dS8xNiIsImV4cCI6MTg0OTI2MzY0MCwiaHR0cDovL2RldnJldi5haS9jbGllbnRpZCI6ImRvbjppZGVudGl0eTpkdnJ2LWluLTE6ZGV2by8yT0pCdGxTd2trOnN2Y2FjYy85MSIsImh0dHA6Ly9kZXZyZXYuYWkvZGV2b19kb24iOiJkb246aWRlbnRpdHk6ZHZydi1pbi0xOmRldm8vMk9KQnRsU3drayIsImh0dHA6Ly9kZXZyZXYuYWkvZGV2b2lkIjoiREVWLTJPSkJ0bFN3a2siLCJodHRwOi8vZGV2cmV2LmFpL3N2Y2FjYyI6ImRvbjppZGVudGl0eTpkdnJ2LWluLTE6ZGV2by8yT0pCdGxTd2trOnN2Y2FjYy85MSIsImh0dHA6Ly9kZXZyZXYuYWkvdG9rZW50eXBlIjoidXJuOmRldnJldjpwYXJhbXM6b2F1dGg6dG9rZW4tdHlwZTphYXQiLCJpYXQiOjE3NTQ2NTU2NDAsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwianRpIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJPSkJ0bFN3a2s6dG9rZW4vMUFTeVhHc2NlIiwic3ViIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJPSkJ0bFN3a2s6c3ZjYWNjLzkxIn0.pfM9TGipDHDOkm2t1Rdlkz5XSomTzFzX4mUSmgOfCbpDHeOQYBc99TVQjhYJpF6I9GG9NFW-KYWOHsu1HBQiwgrWJitglVq6oQufVsQlY7iu0HhtzPDyBpDINlm8H4wTuabb_ReJilsy5Cr6X3EgvaaQs5sjpRH7myqTfgeJs84P5wZxYHj4LmrOpWT3cWdd4h-c4ElygAdZ3Yb-FoWbPaAdJIUi2CFLQbNJ-DaZBLHZ_tZtzTC6FfqpVZ8v5G-uqu-JZ6X4ck1PcCcGBcJ1-8KKuJd4B3G_c6T3BbH40r7RSEQZZohzztIBiTvRZGoG1-fjao9RKPALbX3cpVK0lQ';

app.use(cors());
app.use(express.json());

app.post('/generate-token', async (req, res) => {
  const { email, display_name } = req.body;

  try {
    const payload = {
      rev_info: {
        user_ref: email,
        account_ref: "sk.com",
        workspace_ref: "devrev-workspace",
        user_traits: {
          email: email,
          display_name: display_name
        },
        workspace_traits: {
          display_name: "Devrev Workspace",
        },
        account_traits: {
          display_name: "Securekloud Infosolutions",
          domains: ["Securekloudinfosolutions.com"]
        }
      }
    };
    

    const response = await axios.post('https://api.devrev.ai/auth-tokens.create', payload, {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'authorization': `Bearer ${DEVREV_AAT}`,
        'content-type': 'application/json'
      }
    });
console.log("Full Response from DevRev:", response.data);
    res.json({ session_token: response.data.access_token });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Token generation failed' });
  }
});
// --- User Registration ---
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received registration data:", req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Registration failed:", err); // 🔍 ADD THIS LINE
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
});
// --- User Login ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// API route to get bookings by userId
// Example Express.js code to fetch bookings by userId
app.get('/api/bookings', async (req, res) => {
  const { userId } = req.query;
  try {
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST route to save a booking
app.post('/api/bookings', async (req, res) => {
  const { userId, packages, total } = req.body;

  if (!userId || !packages || !total) {
    return res.status(400).json({ error: 'Invalid booking data' });
  }

  try {
    const newBooking = new Booking({ userId, packages, total });
    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking saved', bookingId: savedBooking._id });
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;

  try {
      const result = await Booking.findByIdAndDelete(bookingId);

      if (!result) {
          return res.status(404).json({ error: 'Booking not found' });
      }

      res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
//fetch the user data
app.get('/api/data', async (req, res) => {
  try {
    const users = await User.find({});
    const transactions = await Transaction.find({});
    const bookings = await Booking.find({});

    res.json({
      users,
      transactions,
      bookings
    });
  } catch (err) {
    console.error('Error fetching combined data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//fetch the bookings data
app.get('/api/bookings/all', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all bookings' });
  }
});
app.get('/api/bookings/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
      const booking = await Booking.findById(bookingId);

      if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      res.status(200).json(booking);
  } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/active-routes', (req, res) => {
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Route registered directly on the app
      routes.push(middleware.route.path);
    } else if (middleware.name === 'router') {
      // Routes added through router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push(handler.route.path);
        }
      });
    }
  });

  res.json({
    totalRoutes: routes.length,
    routes
  });
});



