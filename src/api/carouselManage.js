import http from "../http/http";

// 获取轮播图列表
export const CarouselImage = () => {
  return http({
    url: "/amiyabg/CarouselImage/list",
    method: "get",
  });
};

// 添加轮播图
export const addCarouselImage = (data) => {
  return http({
    url: "/amiyabg/CarouselImage/add",
    method: "post",
    data
  });
};

// 根据轮播图编号获取轮播图信息
export const byIdGetCarouselImage = (id) => {
  return http({
    url: `/amiyabg/CarouselImage/byId/${id}`,
    method: "get",
  });
};

// 修改轮播图信息
export const updateCarouselImage = (data) => {
  return http({
    url: `/amiyabg/CarouselImage`,
    method: "put",
    data
  });
};

// 删除轮播图
export const deleteCarouselImage = (id) => {
  return http({
    url: `/amiyabg/CarouselImage/${id}`,
    method: "delete",
  });
};