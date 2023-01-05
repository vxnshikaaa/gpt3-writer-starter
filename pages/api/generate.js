import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Return a creative song playlist name and a list of 10 similar songs in the format 'artist name - song name' where the song is similar and the song's genre matches perfectly well with the song given below. 
Song Name:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 800,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction

// const openai = require("openai");
// const SpotifyWebApi = require("api.spotify.com");

// // Set up the OpenAI API client
// // openai.apiKey = "your-openai-api-key";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

// // Set up the Spotify API client
// const spotify = new SpotifyWebApi({
//   clientId: "93415b91960d49b1a80a80a28a055f53",
//   clientSecret: "f6806e9121ab49ceb12041ea7222edd7",
// });

// // Prompt the user for a playlist theme
// const prompt = prompt("Enter your mood: ");

// // Use the OpenAI API to generate a list of track names based on the prompt
// openai.completions
//   .create({
//     engine: "davinci",
//     prompt: prompt,
//     max_tokens: 1024,
//     temperature: 0.5,
//   })
//   .then((result) => {
//     const trackNames = result.choices[0].text.split("\n");

//     // Use the Spotify API to search for tracks matching the generated track names
//     const tracks = [];
//     trackNames.forEach((trackName) => {
//       spotify.searchTracks(trackName, { limit: 1 }).then((searchResults) => {
//         if (searchResults.body.tracks.total > 0) {
//           tracks.push(searchResults.body.tracks.items[0].id);
//         }
//       });
//     });

//     // Create a new playlist in the user's Spotify account
//     spotify.createPlaylist(
//       "vee",
//       prompt,
//       { public: true }
//     ).then((playlist) => {
//       // Add the tracks to the playlist
//       spotify.addTracksToPlaylist(playlist.body.id, tracks).then(() => {
//         console.log("Playlist created successfully!");
//       });
//     });
//   });