<template>
  <div>
    <div style="margin-top: 42px">
      <Table border :columns="columns" :data="data" height="671"></Table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedItemList: Array,
  },
  data() {
    return {
      columns: [
        {
          title: "商品",
          key: "thumbPicUrl",
          minWidth: 300,
          render: (h, params) => {
            return h(
              "viewer",
              {
                props: {
                  options: {
                    toolbar: false,
                    title: false,
                    navbar: false,
                  },
                },
                style: {
                  display: "flex",
                },
              },
              [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 15px 5px 5px",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.thumbPicUrl,
                  },
                }),
                h("div", params.row.name),
              ]
            );
          },
        },
        {
          title: "往期价",
          key: "salePrice",
          minWidth: 100,
        },
        {
          title: "采购价",
          key: "salePrice",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                value: params.row.livePrice,
              },
              style: {
                width: "100px",
              },
              on: {
                "on-change": (value) => {
                  this.data[params.index].livePrice = value;
                },
              },
            });
          },
        },
        {
          title: "简介",
          key: "description",
          minWidth: 200,
        },
        {
          title: "规格",
          key: "standard",
          minWidth: 100,
        },
        {
          title: "是否限购",
          key: "isLimitBuy",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.isLimitBuy == true) {
              return h("Icon", {
                props: {
                  type: "md-checkmark",
                },
                style: {
                  fontSize: "18px",
                  color: "#559DF9",
                },
              });
            } else {
              return h("Icon", {
                props: {
                  type: "md-close",
                },
                style: {
                  fontSize: "18px",
                  color: "red",
                },
              });
            }
          },
        },
        {
          title: "限购数量",
          key: "limitBuyQuantity",
          minWidth: 100,
        },
        {
          title: "操作",
          width: 100,
          fixed: "right",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      const [item] = this.data.splice(params.index, 1);
                      this.$emit("handleDeleteItem", item.itemId);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      data: [],
    };
  },
  watch: {
    selectedItemList(selectedItemList) {
      this.data = JSON.parse(JSON.stringify(selectedItemList));
    },
  },
};
</script>

