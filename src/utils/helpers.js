export const debounce = function(callback, wait) {
  let timeout
  return (...args) => {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => callback.apply(context, args), wait)
  }
}

export const throttle = function(func, wait = 100) {
  let timer = null
  return (...args) => {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, wait)
    }
  }
}

export const formatChars = function(str) {
  try {
    return str
      .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, "a")
      .replace(/[èéẻẽẹêềếểễệ]/g, "e")
      .replace(/[đ]/g, "d")
      .replace(/[ìíỉĩị]/g, "i")
      .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, "o")
      .replace(/[ùúủũụưừứửữự]/g, "u")
      .replace(/[ỳýỷỹỵ]/g, "y")
      .replace(/[^\w\s]/gi, "") //replace special chars
      .replace(/  +/g, " ") //replace multi space to one space
      .replace(/ /g, "-")
  } catch {
    return ""
  }
}

export const urlParse = function(str) {
  let query = ""
  if (str) {
    const url = str.split("?")
    if (url.length >= 2) {
      query = url[1]
    }
  } else {
    query = location.search.substr(1)
  }

  let result = {}
  query.split("&").forEach(function(part) {
    if (part) {
      var item = part.split("=")
      result[item[0]] = decodeURIComponent(item[1])
    }
  })
  return result
}

export const urlStringify = function(obj) {
  var encode = encodeURIComponent;
  return Object.keys(obj || {})
    .reduce(function(arr, key) {
      [].concat(obj[key]).forEach(function(v) {
        arr.push(encode(key) + "=" + encode(v));
      });
      return arr;
    }, [])
    .join("&")
    .replace(/\s/g, "+");
};