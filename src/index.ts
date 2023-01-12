import "reflect-metadata";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
var ____published_properties: string[] = [];
export function Published(target: any, key: string): any {
  const targetKey = "on_published_" + key + "Change";
  ____published_properties.push(targetKey);
  target[targetKey] = function (fn: (key: string) => void) {
    fn(key);
  };
}

type onPropChangedHook = (fn: (prev: any, next: any) => void) => void;

export class ObservableObject {
  public observe() {
    for (var publishedKey of ____published_properties) {
      let instance: { [publishedKey: string]: any } = this as {};
      if (instance[publishedKey] !== undefined) {
        (instance[publishedKey] as onPropChangedHook)((key) => {
          let currentValue = instance[key];          
          if (this.observeribtyCallback !== undefined) {
            Reflect.defineProperty(this, key, {
              set(next) {
                currentValue = next;
                this.observeribtyCallback(key, next, instance[key]);
              },
              get() {
                return currentValue;
              }
            });
          }
        });
      }
    }
  }
  public observeribtyCallback?: (key: string, prev: any, next: any) => void;
}

export function useObservedObject<T extends ObservableObject>(m: T): T {
  const [___s, set___s] = useState("");

  useEffect(() => {
    if (m.observeribtyCallback === undefined) {      
      m.observeribtyCallback = (key: string, prev: any, next: any) => {
        set___s(uuidv4());
      };
      m.observe();
    }
  }, []);

  return m;
}
