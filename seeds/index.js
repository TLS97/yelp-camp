const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '613d0c17af630fadea56927a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Perspiciatis, officia autem laboriosam corrupti deleniti illo tenetur sed debitis repellat, ullam atque quo accusantium error ea provident omnis quae odit dignissimos?",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                ]
            },
            images: [
                {
                    "url": "https://res.cloudinary.com/da5mfeipx/image/upload/v1631494891/YelpCamp/nqxmuuyidcsujhjwo9b0.jpg",
                    "filename": "YelpCamp/nqxmuuyidcsujhjwo9b0",
                },
                {
                    "url": "https://res.cloudinary.com/da5mfeipx/image/upload/v1631494892/YelpCamp/wkulsi65jqogz28z5yu1.jpg",
                    "filename": "YelpCamp/wkulsi65jqogz28z5yu1",
                },
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})