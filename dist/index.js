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
                    if (this.observabilityCallbacks &&
                        Object.keys(this.observabilityCallbacks).length !== 0) {
                        Reflect.defineProperty(this, key, {
                            set(next) {
                                currentValue = next;
                                Object.keys(this.observabilityCallbacks).forEach((k) => {
                                    this.observabilityCallbacks[k](key, next, instance[key]);
                                });
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
    observabilityCallbacks;
    addObservabilityCallback(cb, callback) {
        let uuid = (0, uuid_1.v4)();
        this.observabilityCallbacks = { ...this.observabilityCallbacks, uuid: cb };
        callback();
        return uuid;
    }
    unsetObservabilityCallback(uuid) {
        if (this.observabilityCallbacks &&
            this.observabilityCallbacks[uuid] !== undefined) {
            delete this.observabilityCallbacks[uuid];
        }
    }
}
exports.ObservableObject = ObservableObject;
function useObservedObject(m) {
    const [___s, set___s] = (0, react_1.useState)("");
    (0, react_2.useEffect)(() => {
        let id = m.addObservabilityCallback((key, prev, next) => {
            set___s((0, uuid_1.v4)());
        }, () => {
            m.observe();
        });
        return () => {
            m.unsetObservabilityCallback(id);
        };
    }, []);
    return m;
}
exports.useObservedObject = useObservedObject;
