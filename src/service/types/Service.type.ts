//different service status props
interface ServiceInit {
  status: 'init';
}
interface ServiceLoading {
  status: 'loading';
}
interface ServiceLoaded<T> {
  status: 'loaded';
  payload: T;
}
interface ServiceError {
  status: 'error';
  error: Error;
}

//export all interfaces together as a type
export type Service<T> = 
  | ServiceInit
  | ServiceLoading 
  | ServiceLoaded<T> 
  | ServiceError;
