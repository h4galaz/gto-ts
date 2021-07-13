import { useEffect, useState } from 'react';
import { Service } from './types/Service.type';
import { House } from './types/House.type';

interface IceAndFireProps{
	url: string,
	pagesize?: number,
	page?: number,
}

const useIceAndFireApi = ({url, pagesize, page}:IceAndFireProps) => {
	//default to "loading"
	const [result, setResult] = useState<Service<House[]>>({
		status: 'loading'
	});
	//but fetch and handling in a function to reuse
	const getApi = (url:string, callback:(re:any) => void) => {
		return fetch(url)
			.then(re => re.json())
			.then(re => callback(re))
			.catch(error => setResult({status: "error", error}));
	};

	//call API after render and store function to call it later
	//repeates if any provided var changes (url, page, pagesize)
	useEffect(() => {
		if(url){
			//search recursive through the api object and find urls
			//found urls get fetched and entrie gets replaced with the [name] key
			//since both (house & character) has [name] key
			const deepFetchEachRecursive = (obj: any) => {
			    for (let k in obj){
			        if (typeof obj[k] == "object" && obj[k] !== null){
			            deepFetchEachRecursive(obj[k]);
			        }else{
			            if(k !== "url" && obj[k].startsWith("http")){
			            	getApi(obj[k],(re) => {
			            		return re;
			            	}).then((deep:any) => {
			            		obj[k] = deep["name"];
			            	});
			            }
			        }
			    }
			};
			//show loading if specified time has passed
			let loading = setTimeout(() => setResult({status: "loading"}), 250);
			//call provided API and default to pageSize and currPage
			getApi(url+"?pagesize="+pagesize+"&page="+page,(re:any) => {
				deepFetchEachRecursive(re);
				setResult({status: "loaded", payload: re});
				//remove loading
				clearTimeout(loading);
			});
		}
	}, [url,page,pagesize]);

	return result;
}

export default useIceAndFireApi;