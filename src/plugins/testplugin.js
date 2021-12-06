export default (editor) => {
  // This is our custom script (avoid using arrow functions)
  /*const script = function() {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', this);
};

// Define a new custom component
editor.Components.addType('comp-with-js', {
  model: {
    defaults: {
      script,
      // Add some style, just to make the component visible
      style: {
        width: '100px',
        height: '100px',
        background: 'red',
      }
    }
  }
});*/

  const script = function (props) {
    const myLibOpts = {
      prop1: props.myprop1,
      prop2: props.myprop2,
    };
    alert("My lib options: " + JSON.stringify(myLibOpts));
  };

  editor.Components.addType("comp-with-js", {
    model: {
      defaults: {
        script,
        // Define default values for your custom properties
        myprop1: "value1",
        myprop2: "10",
        // Define traits, in order to change your properties
        traits: [
          {
            type: "select",
            name: "myprop1",
            changeProp: true,
            options: [
              { value: "value1", name: "Value 1" },
              { value: "value2", name: "Value 2" },
            ],
          },
          {
            type: "number",
            name: "myprop2",
            changeProp: true,
          },
        ],
        // Define which properties to pass (this will also reset your script on their changes)
        "script-props": ["myprop1", "myprop2"],

        // Add some style, just to make the component visible
        style: {
          width: "100px",
          height: "100px",
          background: "red",
        },
      },
    },
  });

  // Create a block for the component, so we can drop it easily
  editor.Blocks.add("test-block", {
    label: "Test block",
    attributes: { class: "fa fa-text" },
    content:
      '<div data-gjs-type="comp-with-js" data-subreddit="Gloomhaven">Test Component</div>',
  });

  const redditScript = function () {
    /* const initLib = function() {
    const el = this;
    const myLibOpts = {
      prop1: props.myprop1,
      prop2: props.myprop2,
    };
    someExtLib(el, myLibOpts);
  }; */

    if (typeof reddit_widget == "undefined") {
      const script = document.createElement("script");
      // script.onload = initLib;
      //script.src = 'https://giologist.github.io/article-react-reddit-widget/index.js';
      script.src = "./reddit-widget/index.js";
      document.body.appendChild(script);

      const link = document.createElement("link");
      //link.href = 'https://giologist.github.io/article-react-reddit-widget/index.css';
      link.href = "./reddit-widget/index.css";
      link.rel = "stylesheet";
      document.body.appendChild(link);
    } else {
      const el = this;
      reddit_widget.init(el);
    }
  };

  editor.Components.addType("comp-reddit-widget", {
    model: {
      defaults: {
        attributes: { class: "reddit_widget", test_attribute: "test" },
        script: redditScript,
        // Define traits, in order to change your properties
        traits: ["test_attribute", "data-subreddit"],
      },
    },
  });

  // Create a block for the component, so we can drop it easily
  editor.Blocks.add("reddit-block", {
    label: "reddit block",
    attributes: { class: "fa fa-text" },
    content:
      '<div data-gjs-type="comp-reddit-widget" data-subreddit="Gloomhaven"></div>',
  });
};
