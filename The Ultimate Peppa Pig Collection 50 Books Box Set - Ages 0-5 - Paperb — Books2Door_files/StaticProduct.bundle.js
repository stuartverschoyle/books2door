(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[31],{59:function(t,i,e){"use strict";e.r(i),e.d(i,"default",(function(){return v}));var r=e(0);var a=e.n(r);var o=e(1);var s=e.n(o);var n=e(9);var h=e.n(n);var d=e(6);var u=e(8);var c=e(10);var l=e(30);function p(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function f(t,i){for(var e=0;e<i.length;e++){var r=i[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,i,e){return i&&f(t.prototype,i),e&&f(t,e),t}var v=function(){function t(i){var e=this;p(this,t),this.section=i,this.postMessage=i.postMessage,this.context=i.data.context,this.settings=i.data.settings,this.product=i.data.product,this.richText=null,this.reviewForm=null,this.$el=a()(i.el),this.$product=this.$el.find("[data-product-wrapper]"),this.settings&&(this.isThreeColumn="layout--three-col"===this.settings.layout),this.isThemeEditor=window.Shopify&&window.Shopify.designMode,this.useHistory=!this.isThemeEditor&&history.replaceState;var r=this.$product.find("[data-product-gallery]")[0];this.$details=this.$product.find("[data-product-details]"),this.$description=this.$product.find("[data-product-description]"),this.$formRegular=this.$product.find("[data-product-form-regular]"),this.$formAlt=this.$product.find("[data-product-form-alt]"),this.$formArea=this.$product.find("[data-product-form-area]"),this.layoutHandler=this.onBreakpointChange.bind(this),d["a"].onBreakpointChange(this.layoutHandler),this.$productReviews=this.$el.find("[data-product-reviews]"),this._moveForm(),this.$description.length&&(this.richText=new c["a"](this.$description)),this.$productReviews.length&&(this.reviewForm=new u["a"](this.$productReviews,".spr-form-input")),s()(a()("[data-scripts]").data("shopify-api-url"),(function(){var t={$formArea:e.$formArea,$details:e.$details,gallery:r,context:e.context,settings:e.settings,product:e.product,useHistory:e.useHistory,sectionId:i.id};e.productDetails=new l["a"](t)})),this._updatePrices()}return m(t,[{key:"_updatePrices",value:function t(){this.$el.find(".money:not([data-currency]").each((function(t,i){return h.a.update(i)}))}},{key:"onSectionUnload",value:function t(){d["a"].offBreakpointChange(this.layoutHandler),this.productDetails&&this.productDetails.unload(),this.richText&&this.richText.unload(),this.reviewForm&&this.reviewForm.unload()}},{key:"onBreakpointChange",value:function t(){this._moveForm()}},{key:"_moveForm",value:function t(){if(this.isThreeColumn)if(d["a"].isGreaterThanBreakpoint("M")){if(!a.a.contains(this.$formAlt[0],this.$formArea[0])){var i=this.$formArea.detach();this.$formAlt.append(i)}}else if(!a.a.contains(this.$formRegular[0],this.$formArea[0])){var e=this.$formArea.detach();this.$formRegular.append(e)}}}]),t}()}}]);
//# sourceMappingURL=/s/files/1/0024/6874/1219/t/34/assets/StaticProduct.bundle.js.map?v=18164379050095327701
