import path from "path";
import { defineConfig } from "@tarojs/cli";

import devConfig from "./dev";
import prodConfig from "./prod";

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: "transport-tickets",
    date: "2025-7-10",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: ["@tarojs/plugin-generator"],
    defineConstants: {
      ENABLE_INNER_HTML: JSON.stringify(true),
      ENABLE_ADJACENT_HTML: JSON.stringify(true),
      ENABLE_CLONE_NODE: JSON.stringify(true),
      ENABLE_CONTAINS: JSON.stringify(true),
      ENABLE_SIZE_APIS: JSON.stringify(true),
      ENABLE_RTL: JSON.stringify(true),
      ENABLE_TEMPLATE_CONTENT: JSON.stringify(true),
    },
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    // sass: {
    //   data: `$primaryColor: #2C5F74;`,
    // },
    alias: {
      "@/components": path.resolve(__dirname, "..", "src/components"),
      "@/common": path.resolve(__dirname, "..", "src/common"),
    },
    compiler: {
      type: "webpack5",
      prebundle: {
        enable: true,
        esbuild: {
          loader: {
            ".js": "jsx",
          },
        },
      },
    },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      // 在这里添加JSX处理配置
      webpackChain(chain) {
        chain.merge({
          module: {
            rule: {
              jsxRule: {
                test: /\.jsx?$/,
                use: {
                  babelLoader: {
                    loader: require.resolve("babel-loader"),
                    options: {
                      presets: [
                        [
                          "@babel/preset-react", 
                          { runtime: "automatic" }
                        ]
                      ],
                    },
                  },
                },
              },
            },
          },
        });

        // 确保esbuild正确处理JSX语法
        chain.module
          .rule('script')
          .test(/\.[jt]sx?$/)
          .use('babel')
          .loader('babel-loader')
          .options({
            presets: [
              [
                '@babel/preset-react',
                { runtime: 'automatic' }
              ]
            ]
          });

        chain.plugin("definePlugin").tap((args) => {
          const define = args[0];
          define["ENABLE_INNER_HTML"] = JSON.stringify(true);
          define["ENABLE_ADJACENT_HTML"] = JSON.stringify(true);
          define["ENABLE_CLONE_NODE"] = JSON.stringify(true);
          define["ENABLE_CONTAINS"] = JSON.stringify(true);
          define["ENABLE_SIZE_APIS"] = JSON.stringify(true);
          define["ENABLE_RTL"] = JSON.stringify(true);
          define["ENABLE_TEMPLATE_CONTENT"] = JSON.stringify(true);
          return args;
        });
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    h5: {
      esnextModules: ["taro-ui"],
      publicPath: "/",
      staticDirectory: "static",
      output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].js",
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: "module",
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false,
        },
      },
    },
  };

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV;

  let finalConfig = {};
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    finalConfig = merge({}, baseConfig, devConfig);
  } else {
    // 生产构建配置（默认开启压缩混淆等）
    finalConfig = merge({}, baseConfig, prodConfig);
  }

  finalConfig.sass = finalConfig.sass || {};
  // finalConfig.sass.data = `$primaryColor: #2C5F74;`;

  return finalConfig;
});
