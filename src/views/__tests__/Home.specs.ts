import { shallowMount } from "@vue/test-utils";
import App from "../Home.vue";

describe('Home component', () => {
    let wrapper;
    const $route = {
        name: 'Home',
        params: {}
    }
    it("should render the  Home component", () => {
        const $store = {
            state: {
                image_object: {data: []}
            }
        }
        wrapper = shallowMount(App,
            {mocks: {
                $route,
                $store
              }
            }
            );
          expect(wrapper.exists()).toBe(true);
    });

    it("should render the result component if not real images are selected", async () => {
        wrapper.setData({ showResultView: true});
        await wrapper.vm.$nextTick();
        expect( wrapper.find( '.result-view' ).exists() ).toBe( true );
    });
})