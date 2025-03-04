import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>();

  useEffect(() => {
    try {
      const fetchVideos = async () => {
        const data = await apiClient.getVideos()
        setVideos(data)
      }
      fetchVideos()
    } catch (error) {
     console.log('Error while fetching videos',error); 
    }
  },[])
  
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
