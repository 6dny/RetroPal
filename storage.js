let dbPromise;
export function openDB(){
  if(!dbPromise) dbPromise=new Promise((resolve,reject)=>{
    const request=indexedDB.open('retropal',1);
    request.onupgradeneeded=()=>{for(const name of ['games','files','bios','prefs'])request.result.createObjectStore(name);};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(new Error('Local storage is unavailable. Your school or private-browsing settings may restrict it.'));
    request.onblocked=()=>reject(new Error('Close other RetroPal tabs, then reload.'));
  });return dbPromise;
}
export async function get(store,key){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction(store).objectStore(store).get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function all(store){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction(store).objectStore(store).getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function write(operations){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction([...new Set(operations.map(o=>o.store))],'readwrite');for(const o of operations){const s=tx.objectStore(o.store);if(o.delete)s.delete(o.key);else s.put(o.value,o.key);}tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Storage write was interrupted.'));});}
export const put=(store,key,value)=>write([{store,key,value}]);
export const remove=(store,key)=>write([{store,key,delete:true}]);
