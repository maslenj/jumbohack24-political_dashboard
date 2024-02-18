import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const political_data = [
  { name: 'December 1, 2023', leaning: 0.55 },
  { name: 'December 2, 2023', leaning: 0.56 },
  { name: 'December 3, 2023', leaning: 0.57 },
  { name: 'December 4, 2023', leaning: 0.58 },
  { name: 'December 5, 2023', leaning: 0.57 },
  { name: 'December 6, 2023', leaning: 0.58 }
];

const emoiton_data = [
  { name: 'December 1, 2023', happy: 0.55, angry: 0.45, engaged: 0.60 },
  { name: 'December 2, 2023', happy: 0.56, angry: 0.46, engaged: 0.61 },
  { name: 'December 3, 2023', happy: 0.57, angry: 0.47, engaged: 0.62 },
  { name: 'December 4, 2023', happy: 0.58, angry: 0.48, engaged: 0.63 },
  { name: 'December 5, 2023', happy: 0.57, angry: 0.47, engaged: 0.62 },
  { name: 'December 6, 2023', happy: 0.58, angry: 0.48, engaged: 0.63 }
];

const PoliticalLeaningChart = () => {
  return (
    <div className='w-full h-full p-10'>
      <h2 className='mb-5 text-xl font-bold text-center'> Political Leaning Chart </h2>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={political_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Area type="monotone" dataKey="leaning" stroke="#8884d8" fill="#542231" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis domain={[0.4, 0.6]} stroke="#fff" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const EmotionChart = () => {
  return (
    <div className='w-full h-full p-5'>
      <h2 className='text-xl font-bold text-center'> Emotion Chart </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={emoiton_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="happy" stroke="#8884d8" fill="#8884d8" />
          <Line type="monotone" dataKey="angry" stroke="#82ca9d" fill="#82ca9d" />
          <Line type="monotone" dataKey="engaged" stroke="#ffc658" fill="#ffc658" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis domain={[0.4, 0.6]} stroke="#fff" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const CurrentPoliticalLeaning = () => {
  return (
    <div className='w-full h-full p-5'>
      <h2 className='text-xl font-bold text-center'> Current Political Leaning </h2>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-center text-blue-500 text-7xl'> 0.55 </h1>
        <p className='text-center'> Left-Leaning </p>
      </div>
    </div>
  );
}

const TrendingPoliticians = () => {
  return (
    // list of politicians
    <div className='flex flex-col items-center justify-center w-full h-full p-5'>
      <h2 className='text-xl font-bold text-center'> Trending Politicians </h2>
      <table className='w-full p-2 text-center'>
        <tr>
          <th> Politician </th>
          <th> Sentiment </th>
        </tr>
        <tr>
          <td> <a className='hover:underline' href="./"> Joe Biden </a> </td>
          <td> 0.55 </td>
        </tr>
        <tr>
          <td> <a className='hover:underline' href="./"> Donald Trump </a> </td>
          <td> 0.45 </td>
        </tr>
        <tr>
          <td> <a className='hover:underline' href="./"> Michelle Obama </a> </td>
          <td> 0.60 </td>
        </tr>
      </table>
    </div>
  );
}

const AboutUs = () => {
  return (
    <div className='w-full h-full p-5'>
      <h2 className='mb-3 text-xl font-bold text-center'> About Us </h2>
      {/* write some more text */}
      <p className='text-center'> This is a dashboard for r/Politics subreddit. It was created for the 2024 JumboHack hackathon. </p>
    </div>
  );
}

const boxes = [
  { id: 1, rowSpan: 2, colSpan: 2, content: <PoliticalLeaningChart /> },
  { id: 2, rowSpan: 1, colSpan: 1, content: <CurrentPoliticalLeaning /> },
  { id: 3, rowSpan: 1, colSpan: 1, content: <TrendingPoliticians /> },
  { id: 4, rowSpan: 1, colSpan: 1, content: <AboutUs /> },
  { id: 5, rowSpan: 1, colSpan: 2, content: <EmotionChart /> }
];

function App() {
  return (
    <div className='h-full min-h-screen p-5 bg-black'>
      <div className='flex flex-row justify-between p-5'>
        <h1 className='text-2xl font-black text-center text-white'> r/Politics Dashboard </h1>
        <input type="text" placeholder="Search" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white box-border w-[32.5%]" />
      </div>

      <div className="grid auto-rows-[225px] grid-cols-3 gap-4 m-5">
        {boxes.map(box => (
          <div
            key={box.id}
            className={`transition ease-in-out hover:scale-[102%] ${box.rowSpan === 2 ? "row-span-2" : "row-span-1"} ${box.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"} col-span-3 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 text-white flex items-center justify-center cursor-pointer flex-col`}
          >
            {box.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
