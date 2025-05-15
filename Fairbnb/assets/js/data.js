// Mock data for travel packages with INR pricing
const packages = [
    {
        id: 1,
        title: "Tropical Paradise Getaway",
        location: "Bali, Indonesia",
        description: "Experience the ultimate tropical paradise with stunning beaches, crystal clear waters, and luxurious resorts. Perfect for couples seeking a romantic escape with world-class spa treatments and authentic Indonesian cuisine.",
        price: 64999,
        image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=600&h=400&fit=crop"
    },
    {
        id: 2,
        title: "European Adventure Tour",
        location: "Paris, France",
        description: "Discover the magic of Europe with visits to iconic landmarks, world-class museums, and charming cafes. A cultural journey through art, history, and gastronomy in the City of Light.",
        price: 94499,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop"
    },
    {
        id: 3,
        title: "Safari Wildlife Experience",
        location: "Kenya, Africa",
        description: "Embark on an unforgettable safari adventure through the African savanna. Witness magnificent wildlife in their natural habitat including the Big Five and the Great Migration.",
        price: 124499,
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop"
    },
    {
        id: 4,
        title: "Mountain Trekking Adventure",
        location: "Nepal, Himalayas",
        description: "Challenge yourself with breathtaking mountain treks and experience the majestic beauty of the Himalayas. Includes guided treks, mountain lodges, and cultural experiences.",
        price: 89499,
        image: "https://images.unsplash.com/photo-1464822759844-d150ad6fbeb6?w=600&h=400&fit=crop"
    },
    {
        id: 5,
        title: "Luxury Beach Resort",
        location: "Maldives",
        description: "Indulge in luxury at world-class beach resorts with overwater bungalows and pristine white sand beaches. Includes private butler service and water sports activities.",
        price: 164499,
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop"
    },
    {
        id: 6,
        title: "Ancient Wonders Tour",
        location: "Rome, Italy",
        description: "Explore ancient civilizations and historical landmarks in the eternal city of Rome. Perfect for history enthusiasts with guided tours of the Colosseum, Vatican, and more.",
        price: 74499,
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop"
    },
    {
        id: 7,
        title: "Northern Lights Experience",
        location: "Iceland",
        description: "Witness the magical Northern Lights in Iceland's stunning landscape of glaciers, geysers, and volcanic terrain. Includes ice cave exploration and hot spring relaxation.",
        price: 114499,
        image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=400&fit=crop"
    },
    {
        id: 8,
        title: "Caribbean Island Hopping",
        location: "Caribbean Islands",
        description: "Explore multiple tropical islands with crystal-clear waters, sandy beaches, and vibrant local culture. Includes sailing between islands and water sports.",
        price: 89499,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
        id: 9,
        title: "Cultural Heritage Journey",
        location: "Kyoto, Japan",
        description: "Immerse yourself in Japanese culture with visits to ancient temples, traditional gardens, and authentic tea ceremonies. Experience the beauty of historic Kyoto.",
        price: 109499,
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop"
    },
    {
        id: 10,
        title: "Desert Adventure Camp",
        location: "Dubai, UAE",
        description: "Experience the thrill of desert camping with camel rides, sandboarding, and luxury amenities under the stars. Includes dune bashing and traditional Bedouin experiences.",
        price: 84499,
        image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&h=400&fit=crop"
    },
    {
        id: 11,
        title: "Amazon Rainforest Expedition",
        location: "Brazil",
        description: "Explore the world's largest rainforest with guided tours, wildlife spotting, and eco-friendly accommodations. Meet indigenous communities and discover unique biodiversity.",
        price: 104499,
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop"
    },
    {
        id: 12,
        title: "Mediterranean Cruise",
        location: "Mediterranean Sea",
        description: "Sail through the beautiful Mediterranean visiting multiple countries and enjoying luxury onboard amenities. Explore ancient ruins, charming villages, and crystal-clear waters.",
        price: 139499,
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop"
    },
    {
        id: 13,
        title: "New York City Break",
        location: "New York, USA",
        description: "Experience the city that never sleeps with Broadway shows, world-class dining, and iconic landmarks. Perfect for urban explorers and culture enthusiasts.",
        price: 69499,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e4e0e18?w=600&h=400&fit=crop"
    },
    {
        id: 14,
        title: "Great Wall Adventure",
        location: "Beijing, China",
        description: "Walk along the Great Wall of China and explore the rich history and culture of Beijing. Includes visits to the Forbidden City and traditional hutongs.",
        price: 94499,
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop"
    },
    {
        id: 15,
        title: "Australian Outback Safari",
        location: "Australia",
        description: "Discover the rugged beauty of the Australian outback with unique wildlife encounters and stunning landscapes. Includes Uluru visits and Aboriginal cultural experiences.",
        price: 119499,
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&h=400&fit=crop"
    },
    {
        id: 16,
        title: "Scottish Highlands Tour",
        location: "Scotland, UK",
        description: "Explore the mystical Scottish Highlands with castle visits, whisky tastings, and breathtaking scenery. Perfect for nature lovers and history buffs.",
        price: 84499,
        image: "https://images.unsplash.com/photo-1552664730-75b78bbf3516?w=600&h=400&fit=crop"
    },
    {
        id: 17,
        title: "Patagonia Wilderness",
        location: "Argentina/Chile",
        description: "Adventure through the untamed wilderness of Patagonia with glacier trekking and mountain climbing. Experience some of the world's most dramatic landscapes.",
        price: 129499,
        image: "https://images.unsplash.com/photo-1569163477481-fe9474e12583?w=600&h=400&fit=crop"
    },
    {
        id: 18,
        title: "Turkish Delight Experience",
        location: "Istanbul, Turkey",
        description: "Discover the crossroads of Europe and Asia with rich history, stunning architecture, and delicious cuisine. Explore bazaars, mosques, and Ottoman palaces.",
        price: 64499,
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop"
    },
    {
        id: 19,
        title: "Costa Rican Eco Adventure",
        location: "Costa Rica",
        description: "Experience the biodiversity of Costa Rica with zip-lining, wildlife watching, and volcano hikes. Perfect for eco-conscious travelers and adventure seekers.",
        price: 89499,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop"
    },
    {
        id: 20,
        title: "Egyptian Pyramids Tour",
        location: "Cairo, Egypt",
        description: "Uncover the mysteries of ancient Egypt with visits to the pyramids, Sphinx, and museums. Includes Nile River cruise and traditional Egyptian experiences.",
        price: 79499,
        image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&h=400&fit=crop"
    },
    {
        id: 21,
        title: "Norwegian Fjords Cruise",
        location: "Norway",
        description: "Cruise through spectacular Norwegian fjords with dramatic waterfalls and towering cliffs. Experience the midnight sun and pristine Arctic wilderness.",
        price: 124499,
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&h=400&fit=crop"
    },
    {
        id: 22,
        title: "Thai Island Paradise",
        location: "Thailand",
        description: "Relax on pristine beaches and explore vibrant coral reefs in Thailand's tropical islands. Includes cooking classes, temple visits, and island hopping.",
        price: 59499,
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop"
    },
    {
        id: 23,
        title: "Machu Picchu Trek",
        location: "Peru",
        description: "Hike the famous Inca Trail to the ancient citadel of Machu Picchu, one of the New Seven Wonders. Includes acclimatization days and cultural experiences.",
        price: 99499,
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop"
    },
    {
        id: 24,
        title: "Russian Trans-Siberian Railway",
        location: "Russia",
        description: "Embark on an epic journey across Russia on the world's longest railway line. Experience diverse landscapes, cultures, and historic cities.",
        price: 109499,
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
    },
    {
        id: 25,
        title: "Moroccan Desert Expedition",
        location: "Morocco",
        description: "Experience Moroccan culture with desert camping, camel trekking, and visits to ancient medinas. Explore vibrant souks and traditional riads.",
        price: 74499,
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop"
    },
    {
        id: 26,
        title: "Alaskan Wilderness Adventure",
        location: "Alaska, USA",
        description: "Explore the last frontier with glacier cruises, bear watching, and dog sledding experiences. Witness incredible wildlife and untouched wilderness.",
        price: 134499,
        image: "https://images.unsplash.com/photo-1586687909143-0c61249fa634?w=600&h=400&fit=crop"
    },
    {
        id: 27,
        title: "Indian Golden Triangle",
        location: "India",
        description: "Discover India's rich heritage with visits to Delhi, Agra's Taj Mahal, and Jaipur's palaces. Experience vibrant culture, cuisine, and architecture.",
        price: 69499,
        image: "https://images.unsplash.com/photo-1564507592333-c60c67bb5b88?w=600&h=400&fit=crop"
    },
    {
        id: 28,
        title: "Croatian Island Hopping",
        location: "Croatia",
        description: "Sail through the Adriatic Sea visiting Croatia's stunning islands and historic coastal cities. Explore crystal-clear waters and charming medieval towns.",
        price: 84499,
        image: "https://images.unsplash.com/photo-1555990538-b5636ca5b1ea?w=600&h=400&fit=crop"
    },
    {
        id: 29,
        title: "South African Wine Tour",
        location: "South Africa",
        description: "Experience world-class wine regions with tastings, vineyard tours, and gourmet dining. Includes wildlife safaris and cultural experiences.",
        price: 94499,
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a05d7?w=600&h=400&fit=crop"
    },
    {
        id: 30,
        title: "Siberian Husky Adventure",
        location: "Finland/Lapland",
        description: "Enjoy husky sledding through snowy landscapes and stay in cozy log cabins under the aurora. Experience Sami culture and reindeer farms.",
        price: 114499,
        image: "https://images.unsplash.com/photo-1610447847409-a6152b7e90bb?w=600&h=400&fit=crop"
    }
];
