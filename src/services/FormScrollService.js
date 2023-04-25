export class FormScrollService {
  containerRef = null;
  fields = null;

  constructor() {
    this.reset();
  }

  setContainerRef = (ref) => {
    this.containerRef = ref;
  };

  addField = (name, layout) => {
    this.fields[name] = layout;
  };

  scrollToErrorField = (errors) => {
    const keys = Object.keys(errors);

    if (keys.length > 0 && this.fields[keys[0]]) {
      this.containerRef?.scrollTo({
        y: this.fields[keys[0]].y,
        animated: true,
      });
    }
  };

  reset = () => {
    this.containerRef = null;
    this.fields = {};
  };
}
