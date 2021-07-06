let importIcons = (requireContext: any) =>
  requireContext.keys().forEach(requireContext);
try {
  // @ts-ignore
  importIcons(require.context('./icons', true, /\.svg$/));
} catch (e) {
  console.log(e);
}
