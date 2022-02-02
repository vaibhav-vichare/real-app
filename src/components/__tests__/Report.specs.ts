import { shallowMount, createLocalVue } from "@vue/test-utils";
import Report from "../Report.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Report component', () => {
    let wrapper;
    const $route = {
        name: 'Home',
        params: {}
    }
    it("should render the  Report component", () => {
        const $store = {
            getters: {
                currentObject: {
                    "data": [
                        {
                            "url": "blob:http://localhost:8080/0f47e5a6-6d7c-48ae-b0ac-7458cf532726",
                            "reasons": [
                                "Hairs"
                            ]
                        },
                        {
                            "url": "blob:http://localhost:8080/045c6d2f-5e12-4530-a269-02f5987a984e",
                            "reasons": [
                                "Hairs"
                            ]
                        },
                        {
                            "url": "blob:http://localhost:8080/6d173136-a5b2-43e5-bee1-3e7d6dc2a61a",
                            "reasons": [
                                "Eyes"
                            ]
                        },
                        {
                            "url": "blob:http://localhost:8080/d01a73b3-9ce6-4e4d-b5b1-c0d6c6f02df8",
                            "reasons": [
                                "Background"
                            ]
                        }
                    ]
                }
            },
            state: {
                image_object: {

                }
            }
        }
        wrapper = shallowMount(Report,
            {
            mocks: {
                $route,
                $store
            }
            },
            );
          expect(wrapper.exists()).toBe(true);
    });

    it("Should render the Reports based on state",  () => {
        expect(wrapper.html()).toContain(`<div class="reason-header">Hairs</div>`)
        expect(wrapper.html()).toContain(`<div class="reason-header">Eyes</div>`)
        expect(wrapper.html()).toContain(`<div class="reason-header">Background</div>`)
    });

})