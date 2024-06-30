import { useEffect, useState } from "react";
import * as Realm from "realm-web";
export function useApp() {
  const [app, setApp] = useState< Realm.App<any>>();
  // Run in useEffect so that App is not created in server-side environment
  useEffect(() => {
    if(!process.env.NEXT_PUBLIC_APP_ID) return;
    if(Realm.getApp(process.env.NEXT_PUBLIC_APP_ID) === null) return; 

    setApp(Realm.getApp(process.env.NEXT_PUBLIC_APP_ID));
  }, []);
  return app;
}