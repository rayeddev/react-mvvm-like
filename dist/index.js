"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useObservedObject = exports.ObservableObject = exports.Published = void 0;
require("reflect-metadata");
const react_1 = require("react");
const react_2 = require("react");
const uuid_1 = require("uuid");
var ____published_properties = [];
function Published(target, key) {
    const targetKey = "on_published_" + key + "Change";
    ____published_properties.push(targetKey);
    target[targetKey] = function (fn) {
        fn(key);
    };
}
exports.Published = Published;
class ObservableObject {
    observe() {
        for (var publishedKey of ____published_properties) {
            let instance = this;
            if (instance[publishedKey] !== undefined) {
                instance[publishedKey]((key) => {
                    let currentValue = instance[key];
                    console.log({ key }, this.observeribtyCallback);
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
    observeribtyCallback;
}
exports.ObservableObject = ObservableObject;
function useObservedObject(m) {
    const [___s, set___s] = (0, react_1.useState)("");
    (0, react_2.useEffect)(() => {
        if (m.observeribtyCallback === undefined) {
            console.log("is comming herere");
            m.observeribtyCallback = (key, prev, next) => {
                set___s((0, uuid_1.v4)());
            };
            m.observe();
        }
    }, []);
    return m;
}
exports.useObservedObject = useObservedObject;
