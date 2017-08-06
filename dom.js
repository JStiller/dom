var jstiller = jstiller || {};
jstiller.components = jstiller.components || {};

jstiller.components.dom = (function(dependency) {
  /**
   * Returns if the delivered node is a node
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
   * @param {object} deliveredNode 
   * @return {boolean}
   */
  function _isNode(deliveredNode) {
    if (typeof deliveredNode !== 'undefined' && 'nodeType' in deliveredNode && deliveredNode.nodeType > 0) {
      return true;
    }

    return false;
  }

  /**
   * Return an html fragment by a given string
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
   * @param {string} deliveredText
   * @return {object}
   */
  function parse(deliveredText) {
    var parser = new dependency.window.DOMParser(),
      parsedDocument = parser.parseFromString(deliveredText, 'text/html'),
      parentFragment = parsedDocument.querySelector('body').childNodes,
      resultingFragment;

    if (parentFragment.length === 1) {
      resultingFragment = parentFragment[0];
    } else {
      var container = dependency.document.createDocumentFragment();

      while (parentFragment.length > 0) {
        if (parentFragment[0].nodeType === dependency.window.Node.TEXT_NODE && parentFragment[0].nodeValue.trim().length > 0) {
          insert.element(parentFragment[0]).into(container);
        } else if (parentFragment[0].nodeType !== dependency.window.Node.TEXT_NODE && parentFragment[0].nodeType !== dependency.window.Node.COMMENT_NODE) {
          insert.element(parentFragment[0]).into(container);
        }
      }

      resultingFragment = container;
    }

    return resultingFragment;
  }

  var remove = {
    /**
     * Removes the delivered node
     *
     * @param {object} deliveredNode
     * @return {boolean}
     */
    element: function (deliveredNode) {
      if (_isNode(deliveredNode) && _isNode(deliveredNode.parentNode)) {
        deliveredNode.parentNode.removeChild(deliveredNode);
        return true;
      }

      return false;
    },

    /**
     * Removes the delivered class name in the delivered node
     *
     * @param  {string} deliveredClassName
     * @return {object}
     */
    className: function (deliveredClassName) {
      /**
       * @param {object} deliveredNode
       * @return {boolean}
       */
      function from(deliveredNode) {
        if (_isNode(deliveredNode) && deliveredNode.classList.contains(deliveredClassName) === true) {
          deliveredNode.classList.remove(deliveredClassName);
          return true;
        }

        return false;
      }

      return {
        from: from,
      };
    },
  };

  var insert = {
    /**
     * Insert the delivered new node before, after or into the delivered node
     *
     * @param  {object} deliveredNewNode
     * @return {object}
     */
    element: function (deliveredNewNode) {
      /**
       * Returns if the insertion worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function _insert(deliveredNode) {
        if (_isNode(deliveredNode) && _isNode(deliveredNode.parentNode)) {
          deliveredNode.parentNode.insertBefore(deliveredNewNode, deliveredNode);
          return true;
        }

        return false;
      }

      /**
       * Returns if the insertion before the delivered node worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function before(deliveredNode) {
        if (_insert(deliveredNode)) {
          return true;
        }

        return false;
      }

      /**
       * Returns if the insertion after the delivered node worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function after(deliveredNode) {
        if (deliveredNode.nextSibling === null) {
          deliveredNode.parentNode.appendChild(deliveredNewNode);

          return true;
        } else if (_insert(deliveredNode.nextSibling)) {
          return true;
        }

        return false;
      }

      /**
       * Returns if the insertion into the delivered node worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function into(deliveredNode) {
        if (_isNode(deliveredNode)) {
          deliveredNode.appendChild(deliveredNewNode);
        }
      }

      return {
        before: before,
        after: after,
        into: into,
      };
    },

    /**
     * Inserts the delivered class name to the delivered node
     *
     * @param  {string} deliveredClassName
     * @return {object}
     */
    className: function (deliveredClassName) {

      /**
       * Returns if the insertion worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function to(deliveredNode) {
        if (_isNode(deliveredNode) && deliveredNode.classList.contains(deliveredClassName) === false) {
          deliveredNode.classList.add(deliveredClassName);
          return true;
        }

        return false;
      }

      return {
        to: to,
      };
    },

    /**
     * Inserts the delivered text before, after or into the delivered node
     */
    text: function (deliveredText) {
      if (typeof deliveredText !== 'string') {
        throw new TypeError('expected string');
      }

      var textNode = dependency.document.createTextNode(deliveredText);

      /**
       * Returns if the insertion worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function _insert(deliveredNode) {
        if (_isNode(deliveredNode) && _isNode(deliveredNode.parentNode)) {
          deliveredNode.parentNode.insertBefore(textNode, deliveredNode);
          return true;
        }

        throw new TypeError('expected node');

        return false;
      }

      /**
       * Returns if the insertion before the delivered node worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function before(deliveredNode) {
        if (_insert(deliveredNode)) {
          return true;
        }

        return false;
      }

      /**
       * Returns if the insertion after the delivered node worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function after(deliveredNode) {
        if (_insert(deliveredNode.nextSibling)) {
          return true;
        }

        return false;
      }

      /**
       * Returns if the insertion into the delivered node worked
       *
       * @param {object} deliveredNode
       * @return {boolean} 
       */
      function into(deliveredNode) {
        if (!_isNode(deliveredNode)) {
          return false;
        }

        deliveredNode.appendChild(textNode);

        return true;
      }

      return {
        before: before,
        after: after,
        into: into,
      };
    },
  };

  var replace = {
    /**
     * Replace the delivered node by the delivered new node
     *
     * @param  {object} deliveredNode
     * @return {object}
     */
    element: function(deliveredNode) {
      /**
       * Returns if the replacement by the delivered node worked
       *
       * @param {object} deliveredNewNode
       * @return {boolean}
       */
      function by(deliveredNewNode) {
        if (!_isNode(deliveredNewNode) || !_isNode(deliveredNode)) {
          return false;
        }

        if (deliveredNode.parentNode.replaceChild(deliveredNewNode, deliveredNode)) {
          return true;
        }

        return false;
      }

      return {
        by: by
      };
    },

    /**
     * Replace the given content of the delivered node by the delivered text
     *
     * @param  {string} deliveredText
     * @return {object}
     */
    text: function(deliveredText) {
      if (typeof deliveredText !== 'string') {
        throw new TypeError('expected string');
      }

      /**
       * Returns if the replacement of the delivered node worked
       *
       * @param {object} deliveredNode 
       * @return {boolean}
       */
      function of(deliveredNode) {
        if (!_isNode(deliveredNode)) {
          return false;
        }

        deliveredNode.textContent = deliveredText;

        return true;
      }

      return {
        of: of
      };
    },
  };

  /**
   * Returns a node or list of nodes by the delivered selection
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   * @param {string} deliveredSelection
   * @param {object} deliveredSettings
   * @return {object}
   */
  function find(deliveredSelection, deliveredSettings) {
    var defaultSettings = {
      quantity: 'one',
      context: dependency.document,
    };
    var estimatedSettings = deliveredSettings ? dependency.window.Object.assign(defaultSettings, deliveredSettings) : defaultSettings;

    if (estimatedSettings.quantity === 'one') {
      return estimatedSettings.context.querySelector(deliveredSelection);
    } else if (estimatedSettings.quantity === 'all') {
      return dependency.window.Array.prototype.slice.call(estimatedSettings.context.querySelectorAll(deliveredSelection));
    }

    throw new Error('missing or unkown quantity');
  }

  return {
    parse: parse,
    insert: insert,
    replace: replace,
    remove: remove,
    find: find,
  };
}({
  document: document,
  window: window,
}));
