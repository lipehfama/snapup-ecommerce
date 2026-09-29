import 'package:flutter/material.dart';

import 'core/theme/app_theme.dart';

import 'features/home/presentation/screens/home_screen.dart';

class SnapUpApp extends StatelessWidget {
  const SnapUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SnapUp',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      home: const HomeScreen(),
    );
  }
}
